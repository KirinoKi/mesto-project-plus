import { Request, Response, NextFunction } from 'express';
import { POST_NOT_FOUND_MESSAGE } from '../types/errors';
import { Card } from '../models/card';
import { successResponse } from '../helpers';
import NotFoundError from '../types/Errors/NotFoundError';
import ForbiddenError from '../types/Errors/ForbiddenError';

const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => res.status(200).send(successResponse(cards)))
    .catch(next);
};

const createCard = (req: Request, res: Response, next: NextFunction) => {
  Card.create({ ...req.body, owner: req.user?._id })
    .then((card) => res.status(201).send(successResponse(card)))
    .catch(next);
};

const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.cardId;
  const userId = req.user?._id;

  return Card.findById(id)
    .then((card) => {
      if(!card) {
        throw new NotFoundError('Такой карточки не существует')
      }
      if (String(card?.owner) !== userId) {
        throw new ForbiddenError('Это не ваша карточка');
      }
     res.send(card);
     return card?.delete();
    }
    )
    .catch(next);
};

const likeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.user?._id },
    },
    {
      new: true,
    },
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundError(POST_NOT_FOUND_MESSAGE);
      }
      res.status(200).send(successResponse(data));
    })
    .catch(next);
};

const unlikeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: req.user?._id },
    },
    {
      new: true,
    },
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundError(POST_NOT_FOUND_MESSAGE);
      }
      res.status(200).send(successResponse(data));
    })
    .catch(next);
};

export {
  getCards, createCard, deleteCard, likeCard, unlikeCard,
};
