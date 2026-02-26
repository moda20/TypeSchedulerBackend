import { basePrisma } from "@initialization/index";

export const findApiKeyById = (keyId: string) => {
  return basePrisma.apiKeys.findFirst({
    where: {
      id: keyId,
    },
  });
};

export const getAllApiKeysForaUser = (userId: number, isPublic?: boolean) => {
  return basePrisma.apiKeys.findMany({
    where: {
      createdById: userId,
    },
    select: isPublic
      ? {
          id: true,
          name: true,
          created_at: true,
          lastUsedAt: true,
        }
      : undefined,
  });
};

export const extractIdsFromTokens = (token: string) => {
  const [prefix, hToken] = token.split(".");
  const [tokenName, id] = prefix.split("_");
  return {
    id,
    token: hToken,
    tokenName,
  };
};

export const compareApiTokens = async (token: string, hashedToken: string) => {
  const bunNativeHashedToken = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(token),
  );

  const hashedBufferToken = new Uint8Array(Buffer.from(hashedToken, "hex"));

  if (bunNativeHashedToken.byteLength !== hashedBufferToken.byteLength)
    return false;
  return crypto.timingSafeEqual(
    new Uint8Array(bunNativeHashedToken),
    hashedBufferToken,
  );
};

export const createApiKey = async (userId: number, name: string) => {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  const clearToken = Buffer.from(bytes).toString("hex");

  const hashedToken = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(clearToken),
  );

  const savedKey = await basePrisma.apiKeys.create({
    data: {
      name,
      key: Buffer.from(hashedToken).toString("hex"),
      createdById: userId,
    },
  });
  return `sc_${savedKey.id}.${clearToken}`;
};

export const deleteApikey = async (userId: number, keyId: string) => {
  return basePrisma.apiKeys.delete({
    where: {
      id: keyId,
      createdById: userId,
    },
  });
};

export const updateApiKeyUsage = async (keyId: string, userId: number) => {
  return basePrisma.apiKeys.update({
    where: {
      id: keyId,
      createdById: userId,
    },
    data: {
      lastUsedAt: new Date(),
    },
  });
};
