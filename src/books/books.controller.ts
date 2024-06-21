import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { BooksService } from "./books.service";
import { IBook } from "./books.interfaces";

@Controller("books")
export class BooksController {
  constructor(private readonly bookService: BooksService) {}
  @Get()
  getAll(): IBook[] {
    return this.bookService.getAll();
  }

  @Get(":id")
  findById(@Param("id") id: string): IBook {
    return this.bookService.getById(id);
  }

  @Post()
  create(@Body() book: IBook): IBook {
    return this.bookService.create(book);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() book: IBook): IBook {
    return this.bookService.update(id, book);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    this.bookService.delete(id);
    return "ok";
  }

  //   https://docs-nestjs.netlify.app/controllers#full-resource-sample
}
