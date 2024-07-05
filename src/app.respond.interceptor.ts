import { CallHandler, ExecutionContext, InternalServerErrorException, NestInterceptor } from "@nestjs/common";
import { catchError, map, Observable } from "rxjs";

export class AppRespondInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => ({ status: "success", data })),
    );
  }
}
