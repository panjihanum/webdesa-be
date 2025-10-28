import {
  IsString,
  IsBoolean,
  IsOptional,
  IsDateString,
  MaxLength,
} from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  @MaxLength(255)
  slug: string;

  @IsString()
  @MaxLength(255)
  image: string;

  @IsDateString()
  date: string;

  @IsString()
  excerpt: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsBoolean()
  is_show?: boolean;
}
