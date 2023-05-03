import { ErrorRequestHandler } from "express";
import { errorResponse } from "../helpers";

const handleErrors: ErrorRequestHandler = (err, req, res, next): void => { // eslint-disable-line
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send(errorResponse(statusCode === 500 ? "На сервере произошла ошибка" : message));
};

export { handleErrors };
