import express from "express";
import mongoose from "mongoose";
import { usersRouter } from "./routes/usersRouter";
import { cardsRouter } from "./routes/cardsRouter";
import { auth } from "./middlewares/auth";
import { handleErrors } from "./middlewares/handleErrors";

const app = express();
mongoose.connect("mongodb://localhost:27017/mestodb");

const { PORT = 3000 } = process.env;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", auth, usersRouter);
app.use("/cards", auth, cardsRouter);

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Сервер запускается на порте ${PORT}`); // eslint-disable-line
});
