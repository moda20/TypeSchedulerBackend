import config from "@config/config";
import crypto from "crypto";
import { createHmac, timingSafeEqual } from "node:crypto";

const SECRET = createHmac("sha256", process.env.MASTER_ENCRYPTION_KEY ?? "")
  .update("scheduler:admin-ui-token:v1")
  .digest();

export default {
  IV_LENGTH: 16,
  masterKey: Buffer.from(config.get("encryption.masterKey"), "base64"),
  adminSecret: createHmac("sha256", config.get("encryption.masterKey"))
    .update("scheduler:admin-ui-token:v1")
    .digest(),
  adminTokenTTL: 15 * 60 * 1000,
  signUiToken(): string {
    const now = Date.now();
    const payload = Buffer.from(
      JSON.stringify({ iat: now, exp: now + this.adminTokenTTL }),
    ).toString("base64url");
    const sig = createHmac("sha256", SECRET)
      .update(payload)
      .digest()
      .toString("base64url");
    return `${payload}.${sig}`;
  },
  verifyUiToken(token: string): boolean {
    try {
      const dot = token.indexOf(".");
      if (dot <= 0 || dot === token.length - 1) return false;

      const payload = token.slice(0, dot);
      const givenSig = Buffer.from(token.slice(dot + 1), "base64url");

      const expectedSig = createHmac("sha256", this.adminSecret)
        .update(payload)
        .digest();

      // Length check first — timingSafeEqual THROWS on unequal lengths
      if (givenSig.length !== expectedSig.length) return false;
      if (!timingSafeEqual(givenSig, expectedSig)) return false;

      // Signature valid → payload is authentic, safe to parse
      const claims = JSON.parse(
        Buffer.from(payload, "base64url").toString(),
      ) as {
        exp?: number;
      };
      return typeof claims.exp === "number" && claims.exp > Date.now();
    } catch {
      return false; // malformed base64/JSON → reject, never crash the guard
    }
  },
  encryptWithMasterKey(inputText: string | null) {
    if (!inputText) return inputText;
    const IV = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipheriv("aes-256-gcm", this.masterKey, IV);
    const encrypted = Buffer.concat([
      IV,
      cipher.update(inputText, "utf8"),
      cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();
    const fullEncrypted = Buffer.concat([authTag, encrypted]);
    return fullEncrypted.toString("base64url");
  },
  decryptWithMasterKey(encryptedText: string | null) {
    if (!encryptedText) return encryptedText;
    const encryptedBuffer = Buffer.from(encryptedText, "base64url");
    const authTag = encryptedBuffer.subarray(0, 16);
    const IV = encryptedBuffer.subarray(16, 16 + this.IV_LENGTH);
    const cypherText = encryptedBuffer.subarray(this.IV_LENGTH + 16);
    const decipher = crypto.createDecipheriv("aes-256-gcm", this.masterKey, IV);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([
      decipher.update(cypherText),
      decipher.final(),
    ]);
    return decrypted.toString("utf8");
  },
};
