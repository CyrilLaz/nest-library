import { forwardRef, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/users/users.module";
import { JWTStrategy } from "./jwt.strategy";
import { AuthService } from "./auth.service";
import { jwtConstant } from "src/constants/secrets";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstant,
      signOptions: { expiresIn: "12h" },
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [JWTStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
