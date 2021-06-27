import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .send({ success: false, errors: err.serializeErrors() });
  }

  res.status(400).send({
    success: false,
    errors: [{ message: err.message }],
  });
};
