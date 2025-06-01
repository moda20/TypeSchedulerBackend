import config from "@config/config";
import crypto from "crypto";
export default {
  IV_LENGTH: 16,
  masterKey: Buffer.from(config.get("encryption.masterKey"), "base64"),
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
