import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeoConfig } from '../../entities/seo-config.entity';
import { SeoConfigService } from './seo-config.service';
import { SeoConfigController } from './seo-config.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SeoConfig])],
  controllers: [SeoConfigController],
  providers: [SeoConfigService],
})
export class SeoConfigModule {}
