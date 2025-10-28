import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('section_setting')
export class SectionSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  is_show_hero: boolean;
  @Column() hero_title: string;
  @Column('text') hero_subtitle: string;

  @Column({ default: true })
  is_show_profile: boolean;
  @Column() profile_title: string;
  @Column('text') profile_subtitle: string;

  @Column({ default: true })
  is_show_services: boolean;
  @Column() services_title: string;
  @Column('text') services_subtitle: string;

  @Column({ default: true })
  is_show_news: boolean;
  @Column() news_title: string;
  @Column('text') news_subtitle: string;

  @Column({ default: true })
  is_show_gallery: boolean;
  @Column() gallery_title: string;
  @Column('text') gallery_subtitle: string;

  @Column({ default: true })
  is_show_contact: boolean;
  @Column() contact_title: string;
  @Column('text') contact_subtitle: string;

  @Column({ default: true })
  is_show_complaint: boolean;
  @Column() complaint_title: string;
  @Column('text') complaint_subtitle: string;
}
