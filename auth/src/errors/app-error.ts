export abstract class AppError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    // Only required when extending inbuilt class.
    Object.setPrototypeOf(this, AppError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
