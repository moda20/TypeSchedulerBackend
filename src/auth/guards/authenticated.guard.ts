import {
  compareApiTokens,
  extractIdsFromTokens,
  findApiKeyById,
  updateApiKeyUsage,
} from "@repositories/apiKeys";
import { findUserById } from "@repositories/users";
import { APIResponse } from "@typesDef/api";
import { publicUserDTO } from "@typesDef/models/user";
import logger from "@utils/loggers";

export const isAuthenticated = async (
  jwtAccess: any,
  cookie: any,
): Promise<APIResponse<publicUserDTO>> => {
  if (!cookie.access_token) {
    logger.error("@Error: No access token", cookie);
    return {
      success: false,
      message: "Unauthorized",
      errors: "No access token",
    };
  }

  const jwt = await jwtAccess.verify(cookie!.access_token.value);
  if (!jwt) {
    logger.error("@Error: Invalid access token", jwt);
    return {
      success: false,
      message: "Unauthorized",
      errors: "Invalid access token",
    };
  }

  const { userId } = jwt;
  if (!userId) {
    logger.error("@Error: Invalid access token", userId);
    return {
      success: false,
      message: "Unauthorized",
      errors: "Invalid access token",
    };
  }
  const user = await findUserById(Number(userId));

  if (!user) {
    logger.error("@Error: User not found", user);
    return {
      success: false,
      message: "Unauthorized",
      errors: "User not found",
    };
  }

  return {
    success: true,
    data: {
      username: user.username,
      email: user.email,
      id: userId,
    },
  };
};

export const isTokenAuthenticated = async (iToken: string) => {
  if (!iToken) {
    return {
      success: false,
      message: "Unauthorized",
      errors: "No access token",
    };
  }

  const { id, token, tokenName } = extractIdsFromTokens(iToken);
  if (!id || !token || tokenName !== "sc") {
    return {
      success: false,
      message: "Unauthorized",
      errors: "Invalid access token",
    };
  }
  const apiKey = await findApiKeyById(id);
  if (!apiKey) {
    logger.error("@Error: API Key not correct");
    return {
      success: false,
      message: "Unauthorized",
      errors: "Invalid access token",
    };
  }

  const keysMatch = await compareApiTokens(token, apiKey.key);
  if (!keysMatch) {
    logger.error("@Error: API Key not found");
    return {
      success: false,
      message: "Unauthorized",
      errors: "Invalid access token",
    };
  }

  const user = await findUserById(Number(apiKey.createdById));
  if (!user) {
    logger.error("@Error: User not found");
    return {
      success: false,
      message: "Unauthorized",
      errors: "User not found",
    };
  }

  await updateApiKeyUsage(apiKey.id, user.id);

  return {
    success: true,
    data: {
      username: user.username,
      email: user.email,
      id: user.id,
    },
  };
};
