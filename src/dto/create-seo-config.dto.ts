import { IsString } from 'class-validator';

export class CreateSeoConfigDto {
  @IsString() title: string;
  @IsString() description: string;
  @IsString() keywords: string;
  @IsString() og_title: string;
  @IsString() og_description: string;
  @IsString() og_url: string;
  @IsString() og_image: string;
  @IsString() og_locale: string;
  @IsString() og_type: string;
}
