import { Controller, Get, Put, Body } from '@nestjs/common';
import { SectionSettingService } from './section-setting.service';
import { SectionSetting } from '../../entities/section-setting.entity';

@Controller('section-setting')
export class SectionSettingController {
  constructor(private readonly sectionSettingService: SectionSettingService) {}

  @Get()
  async findOne(): Promise<SectionSetting> {
    return this.sectionSettingService.getOrCreate();
  }

  @Put()
  async update(
    @Body() updateDto: Partial<SectionSetting>,
  ): Promise<SectionSetting> {
    return this.sectionSettingService.update(updateDto);
  }
}
