import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BookComment, TBookCommentModel } from "./schemas/book-comment.schema";
import { CreateBookCommentDto } from "./dto/create-comment.dto";
import { UpdateBookCommentDto } from "./dto/update-comment.dto";

@Injectable()
export class BookCommentService {
  constructor(
    @InjectModel(BookComment.name)
    private readonly bookCommentModel: TBookCommentModel
  ) {}

  create(data: CreateBookCommentDto): Promise<BookComment> {
    return this.bookCommentModel.create(data);
  }
  getById(id: string): Promise<BookComment> {
    return this.bookCommentModel.findById(id);
  }
  update({ _id, comment }: UpdateBookCommentDto): Promise<BookComment> {
    return this.bookCommentModel.findByIdAndUpdate(_id, {comment}, {
      new: true,
    });
  }
  delete(id: string): Promise<BookComment> {
    return this.bookCommentModel.findByIdAndDelete(id);
  }
  findAllBookComment(bookId: string): Promise<BookComment[]> {
    return this.bookCommentModel.find({ bookId }).exec();
  }
}
