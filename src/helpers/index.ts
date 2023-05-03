import { ISuccessResponse, IErrorResponse } from "../types/interfaces";

const successResponse = (data: any): ISuccessResponse => ({
  status: "success",
  data,
});

const errorResponse = (message: string): IErrorResponse => ({
  status: "error",
  message,
});

export { successResponse, errorResponse };
