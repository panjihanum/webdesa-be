import { Controller, Get } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get('keuangan')
  async getKeuangan() {
    return this.dataService.getAllKeuangan();
  }

  @Get('penduduk')
  async getPenduduk() {
    return this.dataService.getAllPenduduk();
  }

  @Get('wilayah')
  async getWilayah() {
    return this.dataService.getDataWilayah();
  }

  @Get('usia')
  async getUsia() {
    return this.dataService.getDataUsia();
  }
}
