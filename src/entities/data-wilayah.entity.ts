import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('data_wilayah')
export class DataWilayah {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dusun: string;

  @Column('decimal', { precision: 8, scale: 2 })
  luas_km2: number;

  @Column()
  batas_utara: string;

  @Column()
  batas_selatan: string;

  @Column()
  batas_timur: string;

  @Column()
  batas_barat: string;

  @Column({ default: true })
  is_show: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
