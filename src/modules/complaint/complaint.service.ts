import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Complaint } from '../../entities/complaint.entity';

@Injectable()
export class ComplaintService {
  constructor(
    @InjectRepository(Complaint)
    private readonly complaintRepository: Repository<Complaint>,
  ) {}

  async findAll(): Promise<Complaint[]> {
    return this.complaintRepository.find({ order: { date: 'DESC' } });
  }

  async findOne(id: number): Promise<Complaint> {
    const data = await this.complaintRepository.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException(`Pengaduan dengan ID ${id} tidak ditemukan.`);
    }
    return data;
  }

  async updateStatus(
    id: number,
    status: 'baru' | 'diproses' | 'selesai',
  ): Promise<Complaint> {
    const data = await this.findOne(id);
    data.status = status;
    return this.complaintRepository.save(data);
  }

  async remove(id: number): Promise<void> {
    const result = await this.complaintRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pengaduan dengan ID ${id} tidak ditemukan.`);
    }
  }
}
