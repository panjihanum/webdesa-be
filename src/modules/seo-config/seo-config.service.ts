import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeoConfig } from '../../entities/seo-config.entity';
import { CreateSeoConfigDto } from 'src/dto/create-seo-config.dto';
import { UpdateSeoConfigDto } from 'src/dto/update-seo-config.dto';

@Injectable()
export class SeoConfigService {
  constructor(
    @InjectRepository(SeoConfig) private repo: Repository<SeoConfig>,
  ) {}
  async findOne(id: number) {
    const d = await this.repo.findOne({ where: { id } });
    if (!d) throw new NotFoundException();
    return d;
  }

  async findByPath(path: string) {
    if (path) {
      const d = await this.repo.findOne({ where: { path } });
      if (!d) throw new NotFoundException();
      return d;
    } else {
      const d = await this.repo.find();
      return d;
    }
  }
  async create(dto: CreateSeoConfigDto) {
    return this.repo.save(this.repo.create(dto));
  }
  async update(id: number, dto: UpdateSeoConfigDto) {
    const d = await this.findOne(id);
    Object.assign(d, dto);
    return this.repo.save(d);
  }
  async remove(id: number) {
    const d = await this.findOne(id);
    return this.repo.remove(d);
  }
}
