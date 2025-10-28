import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../../entities/profile.entity';
import { PerangkatDesa } from '../../entities/perangkat-desa.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly repo: Repository<Profile>,
    @InjectRepository(PerangkatDesa)
    private readonly perangkatRepo: Repository<PerangkatDesa>,
  ) {}

  async findAll(): Promise<Profile> {
    return this.repo.findOne({
      where: { is_show: true },
      relations: ['perangkat'],
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Profile> {
    const data = await this.repo.findOne({
      where: { id },
      relations: ['perangkat'],
    });
    if (!data) throw new NotFoundException('Profile not found');
    return data;
  }

  async create(dto: CreateProfileDto): Promise<Profile> {
    const { perangkat, ...profileData } = dto;
    const profile = this.repo.create(profileData);

    if (Array.isArray(perangkat) && perangkat.length > 0) {
      const perangkatEntities = perangkat.map((p) =>
        this.perangkatRepo.create({ ...p, profile }),
      );
      profile.perangkat = perangkatEntities;
    }

    return this.repo.save(profile);
  }

  async update(id: number, dto: UpdateProfileDto): Promise<Profile> {
    const existing = await this.findOne(id);
    const { perangkat, ...profileData } = dto as any;
    Object.assign(existing, profileData);

    if (Array.isArray(perangkat)) {
      await this.perangkatRepo.delete({ profile: { id: existing.id } });

      const newPerangkat = perangkat.map((p) =>
        this.perangkatRepo.create({ ...p, profile: existing }),
      );

      existing.perangkat = ([] as PerangkatDesa[]).concat(...newPerangkat);
    }

    return this.repo.save(existing);
  }

  async remove(id: number) {
    const data = await this.findOne(id);
    return this.repo.remove(data);
  }
}
