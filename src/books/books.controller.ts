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
import { CreateBookDto } from "./interfaces/dto/create-book.dto";
import { TBookDocument } from "./schemas/book.schema";
import { TParamId } from "./interfaces/param-id.type";
import { UpdateBookDto } from "./interfaces/dto/update-book.dto";

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
  findById(@Param("id") id: string): Promise<TBookDocument> {
    console.log(id);
    
    return this.bookService.getById(id);
  }

  @Put(":id")
  update(
    @Param() { id }: TParamId,
    @Body() body: UpdateBookDto
  ): Promise<TBookDocument> {
    return this.bookService.update(id, body);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.bookService.delete(id);
    return "ok";
  }

  //   https://docs-nestjs.netlify.app/controllers#full-resource-sample
}

