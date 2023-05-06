import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} from '../controllers/cards';
import createCardValidator from '../validators/createCardValidator';
import cardIdParamValidator from '../validators/cardIdParamValidator';

const cardsRouter = Router();

export default cardsRouter
  .get('/', getCards)
  .post('/', createCardValidator(), createCard)
  .delete('/:cardId', cardIdParamValidator(), deleteCard)
  .put('/:cardId/likes', cardIdParamValidator(), likeCard)
  .delete('/:cardId/likes', cardIdParamValidator(), unlikeCard);