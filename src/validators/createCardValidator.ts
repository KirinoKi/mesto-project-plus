import { celebrate, Joi, Segments } from 'celebrate';
import { urlRegexp } from '../helpers/index';

export default () => celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegexp),
  }),
});
