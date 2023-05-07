import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SECRET_KEY } from '../types/constants';
import AuthError from '../types/Errors/AuthError';

interface IAuthReq extends Request {
  user?: string | JwtPayload
}

const auth = (req: IAuthReq, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization!.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }

  req.user = payload as { _id: JwtPayload};

  return next();
};

export default auth;
