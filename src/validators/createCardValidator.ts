import { celebrate, Joi, Segments } from 'celebrate';

export default () => celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
    owner: Joi.string().required(),
  }),
});