import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsBoolean()
  is_show?: boolean;
}
