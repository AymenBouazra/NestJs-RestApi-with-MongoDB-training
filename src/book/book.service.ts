import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';
import { Auth } from '../auth/schemas/auth.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    return book;
  }

  async createOne(book: Book, user: Auth): Promise<Book> {
    const data = Object.assign(book, { user: user._id });
    const add = await this.bookModel.create(data);
    return add;
  }

  async updateOne(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  async deleteOne(id: string): Promise<Book> {
    const remove = await this.bookModel.findByIdAndDelete(id);
    return remove;
  }
}
