import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  image: string;

  @Column('datetime')
  date: Date;

  @Column('text')
  excerpt: string;

  @Column('text', { nullable: true })
  content: string;

  @Column({ default: true })
  is_show: boolean;
}
