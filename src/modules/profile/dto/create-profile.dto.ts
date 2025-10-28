import { IsString, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PerangkatDto {
  @IsString() jabatan: string;
  @IsString() nama: string;
}

export class CreateProfileDto {
  @IsString() nama_desa: string;
  @IsString() kepala_desa: string;
  @IsString() sejarah: string;
  @IsString() visi: string;
  @IsArray() misi: string[];
  @IsBoolean() is_show: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PerangkatDto)
  perangkat: PerangkatDto[];
}
