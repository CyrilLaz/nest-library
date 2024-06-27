import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TBookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop([String])
  authors: string[];

  @Prop()
  favorite: boolean;

  @Prop()
  fileCover: string;

  @Prop()
  fileName: string;
}

export const BookSchema = SchemaFactory.createForClass(Book)