import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('gallery')
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  category: string;

  @Column({ default: true })
  is_show: boolean;
}
