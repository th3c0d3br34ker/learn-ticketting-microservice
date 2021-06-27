import { AppError } from './app-error';

export class DatabaseConnectionError extends AppError {
  statusCode: number = 500;
  reason: string = 'Error connecting to database...';
  constructor() {
    super('Error connecting to database...');

    // Only required when extending inbuilt class.
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
