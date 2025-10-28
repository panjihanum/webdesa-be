import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('complaint')
export class Complaint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column('text')
  message: string;

  @Column('datetime')
  date: Date;

  @Column({
    type: 'enum',
    enum: ['baru', 'diproses', 'selesai'],
    default: 'baru',
  })
  status: string;
}
