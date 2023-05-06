import { Router } from 'express';
import { createUser, login } from '../controllers/users';
import signupLoginValidator from '../validators/signupLoginValidator';

const authRouter = Router();

export default authRouter
  .post('/signin', signupLoginValidator(), login)
  .post('/signup', signupLoginValidator(), createUser);