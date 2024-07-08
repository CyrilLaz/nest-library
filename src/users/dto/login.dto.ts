import { IsString, IsDefined, IsEmail, MaxLength } from "class-validator";

export class LoginDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  @MaxLength(3)
  password: string;
}
