import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { KeuanganService } from './keuangan.service';
import { DataKeuangan } from '../../entities/data-keuangan.entity';

@Controller('keuangan')
export class KeuanganController {
  constructor(private readonly keuanganService: KeuanganService) {}

  @Post()
  create(@Body() createDto: Partial<DataKeuangan>): Promise<DataKeuangan> {
    return this.keuanganService.create(createDto);
  }

  @Get()
  findAll(): Promise<DataKeuangan[]> {
    return this.keuanganService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DataKeuangan> {
    return this.keuanganService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: Partial<DataKeuangan>,
  ): Promise<DataKeuangan> {
    return this.keuanganService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.keuanganService.remove(id);
  }
}
