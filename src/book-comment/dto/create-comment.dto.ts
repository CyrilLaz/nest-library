import { IsString, ValidateIf } from "class-validator";
import { isValidObjectId } from "mongoose";

export class CreateBookCommentDto {
  @IsString()
  @ValidateIf(isValidObjectId)
  bookId: string;
  
  @IsString()
  comment: "string";
}
