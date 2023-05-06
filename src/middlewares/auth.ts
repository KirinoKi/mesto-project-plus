import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SECRET_KEY } from '../types/constants';
import AuthError from '../types/Errors/AuthError';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization!.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }

  (req as any).user = payload;

  return next();
};

export default auth;