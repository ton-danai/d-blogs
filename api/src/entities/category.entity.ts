import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'm_categories' })
export class Category {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column()
  name: string;
}
