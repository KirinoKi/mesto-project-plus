import { celebrate, Joi, Segments } from 'celebrate';

export default () => celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().required(),
  }),
});