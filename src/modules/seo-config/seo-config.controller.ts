import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SeoConfigService } from './seo-config.service';
import { CreateSeoConfigDto } from 'src/dto/create-seo-config.dto';
import { UpdateSeoConfigDto } from 'src/dto/update-seo-config.dto';

@Controller('seo-config')
export class SeoConfigController {
  constructor(private service: SeoConfigService) {}
  @Get()
  async findByPath(@Query('path') path?: string) {
    return this.service.findByPath(path);
  }

  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }
  @Post() create(@Body() dto: CreateSeoConfigDto) {
    return this.service.create(dto);
  }
  @Patch(':id') update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSeoConfigDto,
  ) {
    return this.service.update(id, dto);
  }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
