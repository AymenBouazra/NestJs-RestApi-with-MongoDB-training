import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}
  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  async getOneBook(@Param('id') id: string): Promise<Book> {
    const found = await this.bookService.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  @Post()
  @UseGuards(AuthGuard())
  async createBook(
    @Body(new ValidationPipe()) book: CreateBookDto,
    @Req() req,
  ): Promise<Book> {
    return this.bookService.createOne(book, req.user);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateOne(id, book);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.deleteOne(id);
  }
}
