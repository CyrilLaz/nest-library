import { forwardRef, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/users/users.module";
import { JWTStrategy } from "./jwt.strategy";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
import { jwtConstant } from "src/constants/secrets";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstant,
      signOptions: { expiresIn: "60s" },
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
