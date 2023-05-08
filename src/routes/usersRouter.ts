import { Router } from 'express';
import {
  getUsers, getUserById, updateUser, getMe,
} from '../controllers/users';
import updateUserValidator from '../validators/updateUserValidator';
import updateUserAvatarValidator from '../validators/updateUserAvatarValidator';
import getUserByIdValidation from '../validators/getUserByIdValidation';

const usersRouter = Router();

export default usersRouter
  .get('/', getUsers)
  .get('/me', getMe)
  .get('/:userId', getUserByIdValidation(), getUserById)
  .patch('/me', updateUserValidator(), updateUser)
  .patch('/me/avatar', updateUserAvatarValidator(), updateUser);
