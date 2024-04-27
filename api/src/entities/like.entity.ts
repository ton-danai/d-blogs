import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity({ name: 'likes' })
export class Like {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column()
  post_id: number;

  @Column()
  user_email: string;

  @OneToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  post?: Post;
}
