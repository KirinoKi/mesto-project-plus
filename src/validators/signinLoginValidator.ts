import { celebrate, Segments, Joi } from 'celebrate';

export default () => celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});
