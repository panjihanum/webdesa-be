import { IsString, IsBoolean } from 'class-validator';

export class CreateServiceDto {
  @IsString() title: string;
  @IsString() description: string;
  @IsString() icon: string;
  @IsString() slug: string;
  @IsBoolean() is_show: boolean;
}
