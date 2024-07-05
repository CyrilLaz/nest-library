import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppRespondInterceptor } from "./app.respond.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new AppRespondInterceptor());
  await app.listen(process.env.HTTP_PORT);
}
bootstrap();
