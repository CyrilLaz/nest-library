import {
  Body,
  ConflictException,
  Controller,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { catchError, map } from "rxjs";

@Controller("api/users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post("signup")
  register(@Body() data: RegisterDto) {
    return this.userService.create(data).pipe(
      catchError((error) => {
        if (error.code === 11000) {
          throw new ConflictException(
            "Пользователь с таким именем уже существует"
          );
        }
        throw error;
      })
    );
  }

  @Post("signin")
  login(@Body() data: LoginDto) {
    return this.userService.findByEmail(data.email).pipe(
      map((user) => {
        if (!user || !user.validateByPassword(data.password)) {
          throw new UnauthorizedException("Ошибка при попытке авторизации");
        }
        return user;
      })
    );
  }
}
