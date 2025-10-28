import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionSetting } from '../../entities/section-setting.entity';
import { SectionSettingService } from './section-setting.service';
import { SectionSettingController } from './section-setting.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SectionSetting])],
  controllers: [SectionSettingController],
  providers: [SectionSettingService],
  exports: [SectionSettingService],
})
export class SectionSettingModule {}
