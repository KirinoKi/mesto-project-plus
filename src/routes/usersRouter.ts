import { Router } from "express";
import {
  getUsers, getUserById, createUser, updateUser,
} from "../controllers/users";

const usersRouter = Router();

usersRouter
  .get("/", getUsers)
  .get("/:id", getUserById)
  .post("/", createUser)
  .patch("/me", updateUser)
  .patch("/me/avatar", updateUser);

export { usersRouter };
