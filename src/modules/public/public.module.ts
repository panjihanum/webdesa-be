import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteConfig } from '../../entities/site-config.entity';
import { SeoConfig } from '../../entities/seo-config.entity';
import { Profile } from '../../entities/profile.entity';
import { Service } from '../../entities/service.entity';
import { News } from '../../entities/news.entity';
import { Gallery } from '../../entities/gallery.entity';
import { SectionSetting } from '../../entities/section-setting.entity';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SiteConfig,
      SeoConfig,
      Profile,
      Service,
      News,
      Gallery,
      SectionSetting,
    ]),
  ],
  controllers: [PublicController],
  providers: [PublicService],
})
export class PublicModule {}
