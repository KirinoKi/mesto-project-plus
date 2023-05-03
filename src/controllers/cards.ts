import { Request, Response, NextFunction } from "express";
import { Card } from "../models/card";
import { successResponse } from "../helpers";
import { NotFoundError } from "../types/errors";

const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => res.status(200).send(successResponse(cards)))
    .catch(next);
};

const createCard = (req: Request, res: Response, next: NextFunction) => {
  Card.create({ ...req.body, owner: (req as any).user._id })
    .then((card) => res.status(201).send(successResponse(card)))
    .catch(next);
};

const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  Card.deleteOne({ _id: req.params.cardId })
    .then((data) => {
      if (data.deletedCount === 0) {
        throw new NotFoundError("Пост не найден.");
      }
      res.status(200).send(successResponse({ message: "Пост удалён" }));
    })
    .catch(next);
};

const likeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: (req as any).user._id },
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((data) => res.status(200).send(successResponse(data)))
    .catch(next);
};

const unlikeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: (req as any).user._id },
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((data) => res.status(200).send(successResponse(data)))
    .catch(next);
};

export {
  getCards, createCard, deleteCard, likeCard, unlikeCard,
};
