import { AppError } from './app-error';

export class NotFoundError extends AppError {
  statusCode = 404;

  constructor() {
    super('Route not found!');

    // Only required when extending inbuilt class.
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: 'Not Found',
      },
    ];
  }
}
