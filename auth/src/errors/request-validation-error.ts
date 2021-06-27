import { ValidationError } from 'express-validator';
import { AppError } from './app-error';

export class RequestValidationError extends AppError {
  statusCode: number = 400;
  constructor(private errors: ValidationError[]) {
    super('Invalid request parameter');

    // Only required when extending inbuilt class.
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
