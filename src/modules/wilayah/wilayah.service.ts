import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataWilayah } from '../../entities/data-wilayah.entity';

@Injectable()
export class WilayahService {
  constructor(
    @InjectRepository(DataWilayah)
    private readonly wilayahRepository: Repository<DataWilayah>,
  ) {}

  async create(createDto: Partial<DataWilayah>): Promise<DataWilayah> {
    const data = this.wilayahRepository.create(createDto);
    return this.wilayahRepository.save(data);
  }

  async findAll(): Promise<DataWilayah[]> {
    return this.wilayahRepository.find();
  }

  async findOne(id: number): Promise<DataWilayah> {
    const data = await this.wilayahRepository.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException(
        `Data Wilayah dengan ID ${id} tidak ditemukan.`,
      );
    }
    return data;
  }

  async update(
    id: number,
    updateDto: Partial<DataWilayah>,
  ): Promise<DataWilayah> {
    const data = await this.findOne(id);
    Object.assign(data, updateDto);
    return this.wilayahRepository.save(data);
  }

  async remove(id: number): Promise<void> {
    const result = await this.wilayahRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Data Wilayah dengan ID ${id} tidak ditemukan.`,
      );
    }
  }
}
