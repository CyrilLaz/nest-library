import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import { HydratedDocument, Model, Schema as MongoSchema } from "mongoose";
import { CreateBookCommentDto } from "../dto/create-comment.dto";

@Schema({ versionKey: false })
export class BookComment {
  @Prop({ default: 0 })
  id: number;

  @Prop({ type: MongoSchema.Types.ObjectId, ref: "Book" })
  bookId: string;

  @Prop({ required: true })
  comment: string;
}

interface BookCommentStatics {
  create: (
    this: TBookCommentModel,
    data: CreateBookCommentDto
  ) => Promise<TBookCommentDocument>;
}
export type TBookCommentDocument = HydratedDocument<BookComment>;
export type TBookCommentModel = Model<BookComment> & BookCommentStatics;

export const BookCommentSchema = SchemaFactory.createForClass(BookComment);

BookCommentSchema.statics = {
  async create(data: CreateBookCommentDto) {
    const countComments = await this.countDocuments({ bookId: data.bookId }); // TODO: переделать назначение id, возможна гонка.?
    const newComment: TBookCommentDocument = new this({
      ...data,
      id: countComments - 1,
    });
    return newComment.save();
  },
} satisfies BookCommentStatics;
