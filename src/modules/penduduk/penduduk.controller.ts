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
import { PendudukService } from './penduduk.service';
import { DataPenduduk } from '../../entities/data-penduduk.entity';

@Controller('penduduk')
export class PendudukController {
  constructor(private readonly pendudukService: PendudukService) {}

  @Post()
  create(@Body() createDto: Partial<DataPenduduk>): Promise<DataPenduduk> {
    return this.pendudukService.create(createDto);
  }

  @Get()
  findAll(): Promise<DataPenduduk[]> {
    return this.pendudukService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DataPenduduk> {
    return this.pendudukService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: Partial<DataPenduduk>,
  ): Promise<DataPenduduk> {
    return this.pendudukService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.pendudukService.remove(id);
  }
}
