import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../../entities/profile.entity';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PerangkatDesa } from 'src/entities/perangkat-desa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, PerangkatDesa])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
