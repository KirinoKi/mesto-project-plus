import { celebrate, Segments, Joi } from 'celebrate';

export default () => celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().length(24).hex().required(),
  }),
});
