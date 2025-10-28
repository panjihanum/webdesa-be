import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('site_config')
export class SiteConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  site_name: string;

  @Column('text')
  description: string;

  @Column()
  contact_email: string;

  @Column()
  contact_phone: string;

  @Column('text')
  address: string;

  @Column({ nullable: true })
  facebook_url: string;

  @Column({ nullable: true })
  instagram_url: string;

  @Column()
  author: string;

  @Column('decimal', { precision: 10, scale: 6, nullable: true })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 6, nullable: true })
  longitude: number;
}
