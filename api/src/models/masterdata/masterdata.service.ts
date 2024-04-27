import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import CategoryDTO from '../dto/category.dto';
import TopTenDTO from '../dto/top.ten.dto';

@Injectable()
export class MasterdataService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getCategory(): Promise<CategoryDTO[]> {
    const categories = await this.categoryRepository.find();

    const result = categories.map((data) => {
      return {
        id: data.id,
        name: data.name,
      };
    });

    return result;
  }

  async getTopTenCategory(): Promise<TopTenDTO[]> {
    const data = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.posts', 'post')
      .getMany();

    const result: TopTenDTO[] = data
      .map((e) => {
        const groupUser = new Set(e.posts.map((e) => e.author)).size;

        return {
          category_id: e.id,
          category_name: e.name,
          total_user: groupUser,
        };
      })
      .sort((a, b) => a.total_user - b.total_user)
      .reverse()
      .slice(0, 10);

    return result;
  }
}
