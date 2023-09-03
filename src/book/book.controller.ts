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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) { }
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
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads', filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
      }
    },
    )
  }))
  async createBook(
    @Body(new ValidationPipe()) book: CreateBookDto,
    @Req() req,
    @UploadedFile() file
  ): Promise<Book> {
    console.log(file);

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

