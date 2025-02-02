import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodTypeAny } from 'zod';
import { StatusCodes } from 'http-status-codes';

export function validate(
  schema: ZodTypeAny,
  source: 'body' | 'query' | 'params' = 'body',
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[source]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        res.status(StatusCodes.BAD_REQUEST).json({ errors: formattedErrors });
      } else {
        next(error);
      }
    }
  };
}
