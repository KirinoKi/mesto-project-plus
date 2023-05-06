import { celebrate, Joi, Segments } from 'celebrate';

export default () => celebrate({
  [Segments.BODY]: Joi.object({
    avatar: Joi.string().required(),
  }),
});