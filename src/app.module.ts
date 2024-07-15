import { forwardRef, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BooksModule } from "./books/books.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { BookCommentService } from './book-comment/book-comment.service';
import { BookCommentGateway } from './book-comment/book-comment.gateway';
import { BookCommentModule } from './book-comment/book-comment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BooksModule,
    UsersModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    BookCommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
