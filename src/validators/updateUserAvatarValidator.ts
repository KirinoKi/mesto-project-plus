import { celebrate, Joi, Segments } from 'celebrate';
import { urlRegexp } from '../helpers/index';

export default () => celebrate({
  [Segments.BODY]: Joi.object({
    avatar: Joi.string().required().pattern(urlRegexp),
  }),
});
