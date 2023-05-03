import { Router } from "express";
import {
  getCards, createCard, deleteCard, likeCard, unlikeCard,
} from "../controllers/cards";

const cardsRouter = Router();

cardsRouter
  .get("/", getCards)
  .post("/", createCard)
  .delete("/:cardId", deleteCard)
  .put("/:cardId/likes", likeCard)
  .delete("/:cardId/likes", unlikeCard);

export { cardsRouter };
