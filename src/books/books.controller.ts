import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from "@nestjs/common";
import { BooksService } from "./books.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { TBookDocument } from "./schemas/book.schema";
import { UpdateBookDto } from "./dto/update-book.dto";
import { BooksInterceptor } from "./books.interceptor";
import { IdValidationPipe } from "./id.validation.pipe";

@UseInterceptors(BooksInterceptor)
@Controller("books")
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  create(@Body() body: CreateBookDto): Promise<TBookDocument> {
    return this.bookService.create(body);
  }
  @Get()
  getAll(): Promise<TBookDocument[]> {
    return this.bookService.getAll();
  }

  @Get(":id")
  findById(@Param("id", IdValidationPipe) id: string): Promise<TBookDocument> {
    return this.bookService.getById(id);
  }

  @Put(":id")
  update(
    @Param("id", IdValidationPipe) id: string,
    @Body() body: UpdateBookDto
  ): Promise<TBookDocument> {
    return this.bookService.update(id, body);
  }

  @Delete(":id")
  async remove(@Param("id", IdValidationPipe) id: string) {
    await this.bookService.delete(id);
    return "ok";
  }
}
