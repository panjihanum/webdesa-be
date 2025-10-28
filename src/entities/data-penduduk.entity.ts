import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('data_penduduk')
export class DataPenduduk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nik: string;

  @Column()
  nama: string;

  @Column()
  jenis_kelamin: 'L' | 'P';

  @Column({ type: 'date' })
  tanggal_lahir: string;

  @Column()
  alamat: string;

  @Column({ nullable: true })
  dusun: string;

  @Column({ nullable: true })
  rt_rw: string;

  @Column()
  pekerjaan: string;

  @Column()
  status_kawin: string;

  @Column({ default: true })
  is_show: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
