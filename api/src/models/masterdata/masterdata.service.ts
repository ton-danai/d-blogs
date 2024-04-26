import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import CategoryDTO from '../dto/category.dto';

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
}
