import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataPenduduk } from '../../entities/data-penduduk.entity';
import { PendudukService } from './penduduk.service';
import { PendudukController } from './penduduk.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DataPenduduk])],
  controllers: [PendudukController],
  providers: [PendudukService],
})
export class PendudukModule {}
