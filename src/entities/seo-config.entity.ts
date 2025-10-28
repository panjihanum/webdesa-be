import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('seo_config')
@Unique(['path'])
export class SeoConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  keywords: string;

  @Column()
  og_title: string;

  @Column('text')
  og_description: string;

  @Column()
  og_url: string;

  @Column()
  og_image: string;

  @Column()
  og_locale: string;

  @Column()
  og_type: string;
}
