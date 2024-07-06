import { IsString, IsOptional, IsDefined, IsBoolean } from "class-validator";

export class UpdateBookDto {
  @IsString()
  @IsDefined()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString({ each: true })
  @IsOptional()
  authors?: string[];

  @IsBoolean()
  @IsOptional()
  favorite?: boolean;

  @IsString()
  @IsOptional()
  fileCover?: string;

  @IsString()
  @IsOptional()
  fileName?: string;
}
