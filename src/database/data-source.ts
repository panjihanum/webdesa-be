import 'dotenv/config';
import { DataSource } from 'typeorm';
import { SiteConfig } from '../entities/site-config.entity';
import { SeoConfig } from '../entities/seo-config.entity';
import { Profile } from '../entities/profile.entity';
import { Service } from '../entities/service.entity';
import { News } from '../entities/news.entity';
import { Gallery } from '../entities/gallery.entity';
import { Complaint } from '../entities/complaint.entity';
import { SectionSetting } from '../entities/section-setting.entity';
import { PerangkatDesa } from '../entities/perangkat-desa.entity';
import { User } from '../entities/user.entity';
import { DataKeuangan } from '../entities/data-keuangan.entity';
import { DataPenduduk } from '../entities/data-penduduk.entity';
import { DataWilayah } from '../entities/data-wilayah.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'desa_suka_maju',
  synchronize: true,
  logging: false,
  entities: [
    SiteConfig,
    SeoConfig,
    Profile,
    Service,
    News,
    Gallery,
    Complaint,
    SectionSetting,
    PerangkatDesa,
    DataKeuangan,
    DataPenduduk,
    DataWilayah,
    User,
  ],
  migrations: ['dist/database/migrations/*.js'],
});
