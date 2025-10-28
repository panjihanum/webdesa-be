import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { DataKeuangan } from 'src/entities/data-keuangan.entity';
import { DataPenduduk } from 'src/entities/data-penduduk.entity';
import { DataWilayah } from 'src/entities/data-wilayah.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DataKeuangan, DataPenduduk, DataWilayah]),
  ],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
