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
import { WilayahService } from './wilayah.service';
import { DataWilayah } from '../../entities/data-wilayah.entity';

@Controller('wilayah')
export class WilayahController {
  constructor(private readonly wilayahService: WilayahService) {}

  @Post()
  create(@Body() createDto: Partial<DataWilayah>): Promise<DataWilayah> {
    return this.wilayahService.create(createDto);
  }

  @Get()
  findAll(): Promise<DataWilayah[]> {
    return this.wilayahService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DataWilayah> {
    return this.wilayahService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: Partial<DataWilayah>,
  ): Promise<DataWilayah> {
    return this.wilayahService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.wilayahService.remove(id);
  }
}
