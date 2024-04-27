import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { Like } from './like.entity';

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

  @OneToMany(() => Like, (like) => like.post)
  likes?: Like[];
}
