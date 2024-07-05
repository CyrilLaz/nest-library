import { CallHandler, ExecutionContext, HttpException, InternalServerErrorException, NestInterceptor } from "@nestjs/common";
import { catchError, map, Observable } from "rxjs";

export class AppRespondInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => ({ status: "success", data })),
      catchError(error=>{
        if(error instanceof HttpException) throw error // проверить происхождение ошибки
        throw new InternalServerErrorException(error) // иначе отправить универсальную
      })
    );
  }
}
