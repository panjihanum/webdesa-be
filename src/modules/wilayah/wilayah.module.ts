import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataWilayah } from '../../entities/data-wilayah.entity';
import { WilayahService } from './wilayah.service';
import { WilayahController } from './wilayah.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DataWilayah])],
  controllers: [WilayahController],
  providers: [WilayahService],
})
export class WilayahModule {}
