import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';

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

  async createOne(book: Book): Promise<Book> {
    const add = await this.bookModel.create(book);
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
