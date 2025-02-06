import { Request, Response, NextFunction } from 'express';
import { ExtendedError } from '../types/error';
import { StatusCodes } from 'http-status-codes';

function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof ExtendedError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    console.error('Unhandled error:', err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error', error: err?.message });
  }
}

export default errorMiddleware;
