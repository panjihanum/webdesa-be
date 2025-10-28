import { IsString, IsInt } from 'class-validator';
export class CreatePerangkatDesaDto {
  @IsString() jabatan: string;
  @IsString() nama: string;
  @IsInt() profile_id: number;
}
