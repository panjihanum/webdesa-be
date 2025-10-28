import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataKeuangan } from '../../entities/data-keuangan.entity';
import { KeuanganService } from './keuangan.service';
import { KeuanganController } from './keuangan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DataKeuangan])],
  controllers: [KeuanganController],
  providers: [KeuanganService],
})
export class KeuanganModule {}
