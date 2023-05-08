import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../types/constants';
import { USER_NOT_FOUND_MESSAGE, INVALID_EMAIL_OR_PASSWORD_MESSAGE, validationsError, existUserCode } from '../types/errors';
import { User } from '../models/user';
import { successResponse } from '../helpers';
import NotFoundError from '../types/Errors/NotFoundError';
import AuthError from '../types/Errors/AuthError';
import BadRequestError from '../types/Errors/BadRequestError';
import ConflictingRequestError from '../types/Errors/ConflictingRequestError';

const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.status(200).send(successResponse(users)))
    .catch(next);
};

const getUserById = (req: Request & { user?: { _id: string } }, res: Response, next: NextFunction) => {
  User.findById(req.user?._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      }
      res.status(200).send(successResponse(user));
    })
    .catch(next);
};

const createUser = (req: Request, res: Response, next: NextFunction) => {
  bcrypt.hash(req.body.password, 10).then((passwordHash: any) => {
    User.create({ ...req.body, password: passwordHash })
      .then((user) => {
        const { password, ...rest } = user.toObject();
        res.send(successResponse(rest));
      })})
      .catch((err: { name: string; code: number; }) => {
        if (err.name === validationsError) {
          next(new BadRequestError('Указаны не корректные данные'));
        } else if (err.code === existUserCode) {
          next(new ConflictingRequestError('Пользователь уже существует'));
        } else {
          next(err);
        }
      });
  };

const updateUser = (req: Request & { user?: { _id: string } }, res: Response, next: NextFunction) => {
  User.findByIdAndUpdate(req.user?._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      }
      res.status(200).send(successResponse(user));
    })
    .catch(next);
};

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      throw new AuthError(INVALID_EMAIL_OR_PASSWORD_MESSAGE);
    }
   return bcrypt.compare(password, user.password).then((matched: any) => {
      if (!matched) {
        throw new AuthError(INVALID_EMAIL_OR_PASSWORD_MESSAGE);
      }
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      res.cookie('httpOnly', token).send(successResponse({ token }));
    });
  }).catch(next);
};

export {
  getUsers, getUserById, createUser, updateUser, login,
};
