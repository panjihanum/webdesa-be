import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('data_keuangan')
export class DataKeuangan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tahun: string;

  @Column()
  jenis_anggaran: string;

  @Column('decimal', { precision: 15, scale: 2 })
  jumlah: number;

  @Column({ type: 'text' })
  keterangan: string;

  @Column({ default: true })
  is_show: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
