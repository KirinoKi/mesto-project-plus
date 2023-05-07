interface ISuccessResponse<T = any> {
  status: 'success';
  data: T;
}

interface IErrorResponse {
  status: 'error';
  message: string;
}

export { ISuccessResponse, IErrorResponse };
