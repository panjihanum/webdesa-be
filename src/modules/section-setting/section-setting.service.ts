import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectionSetting } from '../../entities/section-setting.entity';

@Injectable()
export class SectionSettingService {
  constructor(
    @InjectRepository(SectionSetting)
    private readonly sectionRepository: Repository<SectionSetting>,
  ) {}

  async getOrCreate(): Promise<SectionSetting> {
    let config = await this.sectionRepository.findOne({ where: {} });
    if (!config) {
      config = this.sectionRepository.create({});
      await this.sectionRepository.save(config);
    }
    return config;
  }

  async update(updateDto: Partial<SectionSetting>): Promise<SectionSetting> {
    const config = await this.getOrCreate();
    Object.assign(config, updateDto);
    return this.sectionRepository.save(config);
  }
}
