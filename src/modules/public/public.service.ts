import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteConfig } from '../../entities/site-config.entity';
import { SeoConfig } from '../../entities/seo-config.entity';
import { Profile } from '../../entities/profile.entity';
import { Service } from '../../entities/service.entity';
import { News } from '../../entities/news.entity';
import { Gallery } from '../../entities/gallery.entity';
import { SectionSetting } from '../../entities/section-setting.entity';

@Injectable()
export class PublicService {
  constructor(
    @InjectRepository(SiteConfig) private siteRepo: Repository<SiteConfig>,
    @InjectRepository(SeoConfig) private seoRepo: Repository<SeoConfig>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    @InjectRepository(Service) private serviceRepo: Repository<Service>,
    @InjectRepository(News) private newsRepo: Repository<News>,
    @InjectRepository(Gallery) private galleryRepo: Repository<Gallery>,
    @InjectRepository(SectionSetting)
    private sectionRepo: Repository<SectionSetting>,
  ) {}

  async getHomeData() {
    const site = await this.siteRepo.findOne({ where: {} });
    const seo = await this.seoRepo.findOne({ where: {} });
    const section = await this.sectionRepo.findOne({ where: {} });

    const profile = await this.profileRepo.findOne({
      where: { is_show: true },
    });
    const services = await this.serviceRepo.find({ where: { is_show: true } });
    const news = await this.newsRepo.find({
      where: { is_show: true },
      order: { date: 'DESC' },
    });
    const gallery = await this.galleryRepo.find({ where: { is_show: true } });

    return {
      site,
      seo,
      section,
      profile,
      services,
      news,
      gallery,
    };
  }
}
