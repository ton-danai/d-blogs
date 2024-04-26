import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';
import CreatePostDTO from './dto/create.post.dto';
import { PostStatusEnum } from 'src/common/enums/post.status.enum';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(model: CreatePostDTO, author: string): Promise<number> {
    const post: Post = {
      ...model,
      author: author,
    };

    if (model.status === PostStatusEnum.PUBLISHED) {
      post.publish_date = new Date();
    }

    const result = await this.postRepository.save(post);

    return result.id;
  }
}
