import { celebrate, Joi, Segments } from 'celebrate';

export default () => celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
});