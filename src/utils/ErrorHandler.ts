import type { StatusCodes } from "http-status-codes";

export class APIError extends Error {
  public readonly message: string;
  public readonly httpCode?: StatusCodes;
  public readonly defaultCode: number = 400;

  constructor(
    message: string,
    name?: string,
    options?: ErrorOptions,
    httpCode?: StatusCodes,
  ) {
    super(message, options);

    this.httpCode = httpCode ?? this.defaultCode;
    this.message = message;
    this.name = name ?? "APIError";

    Object.setPrototypeOf(this, APIError.prototype);
    Error.captureStackTrace(this);
  }
}
