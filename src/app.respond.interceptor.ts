import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { catchError, map, Observable, of } from "rxjs";

export class AppRespondInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => ({ status: "success", data })),
      catchError((error) => of({ status: "fail", data: error }))
    );
  }
}
