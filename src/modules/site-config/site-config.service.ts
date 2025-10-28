import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteConfig } from '../../entities/site-config.entity';
import { CreateSiteConfigDto } from '../../dto/create-site-config.dto';
import { UpdateSiteConfigDto } from '../../dto/update-site-config.dto';

@Injectable()
export class SiteConfigService {
  constructor(
    @InjectRepository(SiteConfig)
    private readonly repo: Repository<SiteConfig>,
  ) {}

  findAll() {
    return this.repo.findOne({ where: {} });
  }

  async findOne(id: number) {
    const data = await this.repo.findOne({ where: { id } });
    if (!data) throw new NotFoundException('Data not found');
    return data;
  }

  async create(dto: CreateSiteConfigDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateSiteConfigDto) {
    const data = await this.findOne(id);
    Object.assign(data, dto);
    return this.repo.save(data);
  }

  async remove(id: number) {
    const data = await this.findOne(id);
    return this.repo.remove(data);
  }
}
