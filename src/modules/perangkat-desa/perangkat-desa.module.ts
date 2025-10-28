import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerangkatDesa } from '../../entities/perangkat-desa.entity';
import { Profile } from '../../entities/profile.entity';
import { PerangkatDesaService } from './perangkat-desa.service';
import { PerangkatDesaController } from './perangkat-desa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PerangkatDesa, Profile])],
  controllers: [PerangkatDesaController],
  providers: [PerangkatDesaService],
})
export class PerangkatDesaModule {}
