import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { successResponse } from "../helpers";
import { NotFoundError } from "../types/errors";

const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.status(200).send(successResponse(users)))
    .catch(next);
};

const getUserById = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      }
      res.status(200).send(successResponse(user));
    })
    .catch(next);
};

const createUser = (req: Request, res: Response, next: NextFunction) => {
  User.create(req.body)
    .then((user) => res.send(successResponse(user)))
    .catch(next);
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  User.findByIdAndUpdate((req as any).user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      }
      res.status(200).send(successResponse(user));
    })
    .catch(next);
};

export {
  getUsers, getUserById, createUser, updateUser,
};
