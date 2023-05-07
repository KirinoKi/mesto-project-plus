import express, { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import usersRouter from './routes/usersRouter';
import cardsRouter from './routes/cardsRouter';
import authRouter from './routes/authRouter';
import auth from './middlewares/auth';
import handleErrors from './middlewares/handleErrors';
import { requestLogger, errorLogger } from './middlewares/logger';
import authValidator from './validators/authValidator';

interface Error {
  statusCode: number,
  message: string,
}

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
app.use((
  err: Error,
  _req: Request,
  _res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) => {
  const { statusCode = 500, message } = err;
  _res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Сервер запускается на порте ${PORT}`); // eslint-disable-line
});
