import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PerangkatDesa } from './perangkat-desa.entity';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama_desa: string;

  @Column()
  kepala_desa: string;

  @Column('text')
  sejarah: string;

  @Column()
  visi: string;

  @Column('simple-array')
  misi: string[];

  @Column({ default: true })
  is_show: boolean;

  @OneToMany(() => PerangkatDesa, (perangkat) => perangkat.profile, {
    cascade: true,
  })
  perangkat: PerangkatDesa[];
}
