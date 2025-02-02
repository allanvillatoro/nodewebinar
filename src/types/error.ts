import { StatusCodes } from 'http-status-codes';

export class ExtendedError extends Error {
  statusCode: number;
  name: string;
  constructor(name: string, statusCode: number, message: string) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends ExtendedError {
  constructor(message: string) {
    super('BadRequestError', StatusCodes.BAD_REQUEST, message);
  }
}

export class NotFoundError extends ExtendedError {
  constructor(message: string) {
    super('NotFoundError', StatusCodes.NOT_FOUND, message);
  }
}

export class InternalServerError extends ExtendedError {
  constructor(message: string) {
    super('InternalServerError', StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}

export class UnauthorizedError extends ExtendedError {
  constructor(message: string) {
    super('UnauthorizedError', StatusCodes.UNAUTHORIZED, message);
  }
}

export class NotImplementedError extends ExtendedError {
  constructor(message: string) {
    super('NotImplementedError', StatusCodes.NOT_IMPLEMENTED, message);
  }
}
