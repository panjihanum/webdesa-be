import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Profile } from './profile.entity';

@Entity('perangkat_desa')
export class PerangkatDesa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jabatan: string;

  @Column()
  nama: string;

  @ManyToOne(() => Profile, (profile) => profile.perangkat)
  profile: Profile;
}
