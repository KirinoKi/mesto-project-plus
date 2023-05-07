import { Router } from 'express';
import { createUser, login } from '../controllers/users';
import signupLoginValidator from '../validators/signupLoginValidator';
import signinLoginValidator from '../validators/signinLoginValidator';

const authRouter = Router();

export default authRouter
  .post('/signin', signinLoginValidator(), login)
  .post('/signup', signupLoginValidator(), createUser);
