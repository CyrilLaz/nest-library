import { IsString, IsDefined, IsEmail, MinLength } from "class-validator";

export class RegisterDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  @MinLength(3)
  password: string;

  @IsString()
  @IsDefined()
  @MinLength(3)
  firstName: string;

  @IsString()
  @IsDefined()
  @MinLength(3)
  lastName: string;
}
