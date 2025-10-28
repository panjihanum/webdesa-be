import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '../../entities/news.entity';
import { CreateNewsDto } from '../../dto/create-news.dto';
import { UpdateNewsDto } from '../../dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly repo: Repository<News>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const data = await this.repo.findOne({ where: { id } });
    if (!data) throw new NotFoundException('News not found');
    return data;
  }

  async findBySlug(slug: string) {
    const data = await this.repo.findOne({ where: { slug } });
    if (!data) throw new NotFoundException('News not found');
    return data;
  }

  async create(dto: CreateNewsDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateNewsDto) {
    const data = await this.findOne(id);
    Object.assign(data, dto);
    return this.repo.save(data);
  }

  async remove(id: number) {
    const data = await this.findOne(id);
    return this.repo.remove(data);
  }
}
