import { IsString, IsDefined, IsEmail, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  @MinLength(3)
  password: string;
}
