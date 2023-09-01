import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Auth } from '../../auth/schemas/auth.schema';
import mongoose from 'mongoose';

export enum Category {
  ADVENTURE = 'Adventure',
  CLASSICS = 'Classics',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
}
@Schema({
  timestamps: true,
  versionKey: false,
})
export class Book {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop()
  price: number;

  @Prop()
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  user: Auth;
}

export const BookSchema = SchemaFactory.createForClass(Book);
