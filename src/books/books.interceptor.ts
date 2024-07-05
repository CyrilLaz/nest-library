import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from "@nestjs/common";
import { catchError, map, Observable } from "rxjs";
import { Error as MongooseError } from "mongoose";

@Injectable()
export class BooksInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof MongooseError.CastError) {
          throw new BadRequestException(error);
        }
        throw new InternalServerErrorException(error);
      })
    );
  }
}
