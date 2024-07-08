import { IsString, IsDefined, IsEmail, MaxLength } from "class-validator";

export class RegisterDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  @MaxLength(3)
  password: string;

  @IsString()
  @IsDefined()
  @MaxLength(3)
  firstName: string;

  @IsString()
  @IsDefined()
  @MaxLength(3)
  lastName: string;
}
