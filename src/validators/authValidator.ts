import { celebrate, Joi, Segments } from 'celebrate';

export default () => celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().regex(/^Bearer\s/),
  }).unknown(),
});
