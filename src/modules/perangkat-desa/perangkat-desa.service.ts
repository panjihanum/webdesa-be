import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerangkatDesa } from '../../entities/perangkat-desa.entity';
import { CreatePerangkatDesaDto } from './dto/create-perangkat-desa.dto';
import { UpdatePerangkatDesaDto } from './dto/update-perangkat-desa.dto';
import { Profile } from '../../entities/profile.entity';

@Injectable()
export class PerangkatDesaService {
  constructor(
    @InjectRepository(PerangkatDesa) private repo: Repository<PerangkatDesa>,
    @InjectRepository(Profile) private prof: Repository<Profile>,
  ) {}
  findAll() {
    return this.repo.find({ relations: ['profile'] });
  }
  async findOne(id: number) {
    const d = await this.repo.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!d) throw new NotFoundException();
    return d;
  }
  async create(dto: CreatePerangkatDesaDto) {
    const p = await this.prof.findOne({ where: { id: dto.profile_id } });
    const e = this.repo.create({
      jabatan: dto.jabatan,
      nama: dto.nama,
      profile: p,
    });
    return this.repo.save(e);
  }
  async update(id: number, dto: UpdatePerangkatDesaDto) {
    const d = await this.findOne(id);
    Object.assign(d, dto);
    return this.repo.save(d);
  }
  async remove(id: number) {
    const d = await this.findOne(id);
    return this.repo.remove(d);
  }
}
