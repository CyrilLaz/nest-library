import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Book, TBookDocument } from "./schemas/book.schema";
import { CreateBookDto } from "./interfaces/dto/create-book.dto";
import { UpdateBookDto } from "./interfaces/dto/update-book.dto";

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private BookModel: Model<Book>) {}

  create(data: CreateBookDto): Promise<TBookDocument> {
    const book = new this.BookModel(data);
    return book.save();
  }
  getAll(): Promise<TBookDocument[]> {
    return this.BookModel.find().exec();
  }
  update(id: string, data: UpdateBookDto): Promise<TBookDocument> {
    return this.BookModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
  }
  getById(id: string): Promise<TBookDocument> {
    return this.BookModel.findById(id);
  }
  delete(id: string): Promise<void> {
    return this.BookModel.findByIdAndDelete(id);
  }
}

