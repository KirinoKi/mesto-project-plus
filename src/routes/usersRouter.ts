import { Router } from 'express';
import {
  getUsers, getUserById, updateUser,
} from '../controllers/users';
import updateUserValidator from '../validators/updateUserValidator';
import updateUserAvatarValidator from '../validators/updateUserAvatarValidator';

const usersRouter = Router();

export default usersRouter
  .get('/', getUsers)
  .get('/me', getUserById)
  .patch('/me', updateUserValidator(), updateUser)
  .patch('/me/avatar', updateUserAvatarValidator(), updateUser);