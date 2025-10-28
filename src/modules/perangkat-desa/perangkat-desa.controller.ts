import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { PerangkatDesaService } from './perangkat-desa.service';
import { CreatePerangkatDesaDto } from './dto/create-perangkat-desa.dto';
import { UpdatePerangkatDesaDto } from './dto/update-perangkat-desa.dto';

@Controller('perangkat-desa')
export class PerangkatDesaController {
  constructor(private service: PerangkatDesaService) {}
  @Get() findAll() {
    return this.service.findAll();
  }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }
  @Post() create(@Body() dto: CreatePerangkatDesaDto) {
    return this.service.create(dto);
  }
  @Patch(':id') update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePerangkatDesaDto,
  ) {
    return this.service.update(id, dto);
  }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
