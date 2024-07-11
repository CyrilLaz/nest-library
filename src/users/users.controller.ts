import {
  Body,
  ConflictException,
  Controller,
  Inject,
  Post,
  UnauthorizedException,
  forwardRef,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { catchError, from, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "src/auth/auth.service";

@Controller("api/users")
export class UsersController {
  constructor(
    private authService: AuthService,
    private readonly userService: UsersService
  ) {}
  @Post("signup")
  register(@Body() data: RegisterDto) {
    return from(this.userService.create(data)).pipe(
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
    return from(this.userService.findByEmail(data.email)).pipe(
      map((user) => {
        if (!user || !user.validateByPassword(data.password)) {
          throw new UnauthorizedException("Ошибка при попытке авторизации");
        }
        return user;
      }),
      switchMap((user) => of(this.authService.createToken(user))),
      map((token) => ({ token }))
    );
  }
}
