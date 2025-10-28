import { PartialType } from '@nestjs/mapped-types';
import { CreatePerangkatDesaDto } from './create-perangkat-desa.dto';
export class UpdatePerangkatDesaDto extends PartialType(
  CreatePerangkatDesaDto,
) {}
