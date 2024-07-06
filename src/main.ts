import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppRespondInterceptor } from "./app.respond.interceptor";
import { HttpExceptionFilter } from "./app-exception.filter";
import { ValidationPipe } from "./app.validation.pipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new AppRespondInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.HTTP_PORT);
}
bootstrap();
