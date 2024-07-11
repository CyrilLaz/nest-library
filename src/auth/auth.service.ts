import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { IJwtPayload } from "./auth.interface";
import { TUserDocument } from "src/users/schemas/User.schema";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UsersService
  ) {}

  validateUser(id: string) {
    return this.userService.findById(id);
  }

  createToken(user: TUserDocument) {
    const payload: IJwtPayload = {
      email: user.email,
      firstName: user.firstName,
      id: user.id,
    };

    return this.jwtService.sign(payload);
  }
}
