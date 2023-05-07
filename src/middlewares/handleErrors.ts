import {
  Request, Response, NextFunction, ErrorRequestHandler,
} from 'express';
import { errorResponse } from '../helpers';
import { CustomStatusCodeErrors } from '../types/Errors/index';

interface Error {
  statusCode: number,
  message: string,
}

const handleErrors: ErrorRequestHandler = (
  err: Error | CustomStatusCodeErrors,
  req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line
): void => {
  const { statusCode = 500 } = err
  const message = statusCode === 500 ? 'Ошибка сервера' : err.message

  res.status(statusCode).send(errorResponse(message))
} 

export default handleErrors;
