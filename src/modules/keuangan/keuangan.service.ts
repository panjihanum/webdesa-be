import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataKeuangan } from '../../entities/data-keuangan.entity';

@Injectable()
export class KeuanganService {
  constructor(
    @InjectRepository(DataKeuangan)
    private readonly keuanganRepository: Repository<DataKeuangan>,
  ) {}

  async create(createDto: Partial<DataKeuangan>): Promise<DataKeuangan> {
    const data = this.keuanganRepository.create(createDto);
    return this.keuanganRepository.save(data);
  }

  async findAll(): Promise<DataKeuangan[]> {
    return this.keuanganRepository.find();
  }

  async findOne(id: number): Promise<DataKeuangan> {
    const data = await this.keuanganRepository.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException(
        `Data Keuangan dengan ID ${id} tidak ditemukan.`,
      );
    }
    return data;
  }

  async update(
    id: number,
    updateDto: Partial<DataKeuangan>,
  ): Promise<DataKeuangan> {
    const data = await this.findOne(id);
    Object.assign(data, updateDto);
    return this.keuanganRepository.save(data);
  }

  async remove(id: number): Promise<void> {
    const result = await this.keuanganRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Data Keuangan dengan ID ${id} tidak ditemukan.`,
      );
    }
  }
}
