import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  category_id: number;

  @Column()
  status: string;

  @Column()
  author?: string;

  @Column()
  publish_date?: Date | null | undefined;

  @Column()
  create_at?: Date;

  @Column()
  update_at?: Date;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category?: Category;
}
