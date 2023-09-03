import {
  IsEnum,
  IsNotEmpty,
  Length,
  IsNumber,
  IsEmpty,
  IsString,
} from 'class-validator';
import { Category } from '../schemas/book.schema';
import { Auth } from '../../auth/schemas/auth.schema';

export class CreateBookDto {
  @IsNotEmpty({ message: 'Book should have a title' })
  @Length(3, 255)
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @Length(3)
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  // @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsEnum(['Adventure', 'Fantasy', 'Crime', 'Classics'])
  readonly category: Category;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: Auth;
}
