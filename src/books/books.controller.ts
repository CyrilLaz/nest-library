import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { BooksService } from "./books.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { TBookDocument } from "./schemas/book.schema";
import { UpdateBookDto } from "./dto/update-book.dto";
import { BooksInterceptor } from "./books.interceptor";
import { IdValidationPipe } from "./id.validation.pipe";
import { JwtAuthGuard } from "src/auth/jwt.auth.guard";

@UseInterceptors(BooksInterceptor)
@Controller("books")
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateBookDto): Promise<TBookDocument> {
    return this.bookService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): Promise<TBookDocument[]> {
    return this.bookService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findById(@Param("id", IdValidationPipe) id: string): Promise<TBookDocument> {
    return this.bookService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  update(
    @Param("id", IdValidationPipe) id: string,
    @Body() body: UpdateBookDto
  ): Promise<TBookDocument> {
    return this.bookService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id", IdValidationPipe) id: string) {
    await this.bookService.delete(id);
    return "ok";
  }
}
