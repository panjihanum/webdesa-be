import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataPenduduk } from '../../entities/data-penduduk.entity';

@Injectable()
export class PendudukService {
  constructor(
    @InjectRepository(DataPenduduk)
    private readonly pendudukRepository: Repository<DataPenduduk>,
  ) {}

  async create(createDto: Partial<DataPenduduk>): Promise<DataPenduduk> {
    const data = this.pendudukRepository.create(createDto);
    return this.pendudukRepository.save(data);
  }

  async findAll(): Promise<DataPenduduk[]> {
    return this.pendudukRepository.find();
  }

  async findOne(id: number): Promise<DataPenduduk> {
    const data = await this.pendudukRepository.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException(
        `Data Penduduk dengan ID ${id} tidak ditemukan.`,
      );
    }
    return data;
  }

  async update(
    id: number,
    updateDto: Partial<DataPenduduk>,
  ): Promise<DataPenduduk> {
    const data = await this.findOne(id);
    Object.assign(data, updateDto);
    return this.pendudukRepository.save(data);
  }

  async remove(id: number): Promise<void> {
    const result = await this.pendudukRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Data Penduduk dengan ID ${id} tidak ditemukan.`,
      );
    }
  }
}
