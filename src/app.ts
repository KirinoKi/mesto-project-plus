import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import usersRouter from './routes/usersRouter';
import cardsRouter from './routes/cardsRouter';
import authRouter from './routes/authRouter';
import auth from './middlewares/auth';
import handleErrors from './middlewares/handleErrors';
import { requestLogger, errorLogger } from './middlewares/logger';
import authValidator from './validators/authValidator';
import NotFoundError from './types/Errors/NotFoundError';

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

const { PORT = 3000 } = process.env;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('', authRouter);

app.use(authValidator(), auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.get("*", () => {
  throw new NotFoundError("Такой страницы не существует");
});

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Сервер запускается на порте ${PORT}`); // eslint-disable-line
});
