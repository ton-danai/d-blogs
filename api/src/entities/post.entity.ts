import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  author: string;

  @Column()
  publish_date?: Date;

  @Column()
  create_at?: Date;

  @Column()
  update_at?: Date;
}
