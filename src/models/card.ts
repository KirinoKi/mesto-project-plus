import { Schema, ObjectId, model } from 'mongoose';
import { urlValidator } from '../helpers';

export interface ICard {
  name: string;
  link: string;
  owner: ObjectId;
  likes: ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: urlValidator,
      message: 'Неверно указан url',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    requred: true,
  },
  likes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = model<ICard>('card', cardSchema);

export { Card };
