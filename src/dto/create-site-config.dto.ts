import { IsString, IsOptional, MaxLength, IsNumber } from 'class-validator';

export class CreateSiteConfigDto {
  @IsString()
  @MaxLength(255)
  site_name: string;

  @IsString()
  description: string;

  @IsString()
  @MaxLength(255)
  contact_email: string;

  @IsString()
  @MaxLength(20)
  contact_phone: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  facebook_url?: string;

  @IsOptional()
  @IsString()
  instagram_url?: string;

  @IsString()
  author: string;

  @IsOptional() @IsNumber() latitude?: number;
  @IsOptional() @IsNumber() longitude?: number;
}
