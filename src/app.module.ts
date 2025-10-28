import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from './modules/news/news.module';
import { PublicModule } from './modules/public/public.module';
import { SiteConfigModule } from './modules/site-config/site-config.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeoConfigModule } from './modules/seo-config/seo-config.module';
import { ProfileModule } from './modules/profile/profile.module';
import { PerangkatDesaModule } from './modules/perangkat-desa/perangkat-desa.module';
import { SectionSettingModule } from './modules/section-setting/section-setting.module';
import { KeuanganModule } from './modules/keuangan/keuangan.module';
import { WilayahModule } from './modules/wilayah/wilayah.module';
import { PendudukModule } from './modules/penduduk/penduduk.module';
import { ComplaintModule } from './modules/complaint/complaint.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { ServicesModule } from './modules/services/services.module';
import { UploadController } from './modules/upload/upload.controller';
import { DataModule } from './modules/data/data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    SiteConfigModule,
    SeoConfigModule,
    SectionSettingModule,
    ProfileModule,
    PerangkatDesaModule,
    NewsModule,
    KeuanganModule,
    WilayahModule,
    PendudukModule,
    PublicModule,
    ComplaintModule,
    GalleryModule,
    ServicesModule,
    DataModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule {}
