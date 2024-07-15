import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from "@nestjs/websockets";
import { from, map, Observable, switchMap } from "rxjs";
import { BookComment } from "./schemas/book-comment.schema";
import { BookCommentService } from "./book-comment.service";
import { CreateBookCommentDto } from "./dto/create-comment.dto";

@WebSocketGateway({ cors: true })
export class BookCommentGateway {
  constructor(protected bookCommentService: BookCommentService) {}

  @SubscribeMessage("getAllComments")
  handleGetAllComments(
    @MessageBody("bookId") id: string
  ): Observable<WsResponse<BookComment>> {
    return from(this.bookCommentService.findAllBookComment(id)).pipe(
      switchMap((comments) => from(comments)),
      map((comment) => ({ event: "getAllComments", data: comment }))
    );
  }

  @SubscribeMessage("addComment")
  handleAddComment(@MessageBody() data: CreateBookCommentDto) {
    return from(this.bookCommentService.create(data));
  }
}
