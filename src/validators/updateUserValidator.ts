import { celebrate, Joi, Segments } from 'celebrate';

export default () => celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
});