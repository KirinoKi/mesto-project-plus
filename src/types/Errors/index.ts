import AuthError from './AuthError';
import BadRequestError from './BadRequestError';
import NotFoundError from './NotFoundError';
import ForbiddenError from './ForbiddenError';
import ConflictingRequestError from './ConflictingRequestError';

export type CustomStatusCodeErrors =
  | AuthError
  | BadRequestError
  | NotFoundError
  | ForbiddenError
  | ConflictingRequestError;