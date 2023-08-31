import { IsEnum, IsNotEmpty, Length } from 'class-validator';
import { Category } from '../schemas/book.schema';

export class CreateBookDto {
  @IsNotEmpty({ message: 'Book should have a title' })
  @Length(3, 255)
  readonly title: string;
  @Length(3)
  readonly description: string;
  readonly author: string;
  readonly price: number;
  @IsEnum(['Adventure', 'Fantasy', 'Crime', 'Classics'])
  readonly category: Category;
}
