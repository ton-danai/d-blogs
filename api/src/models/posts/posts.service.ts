import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';
import { PostStatusEnum } from 'src/common/enums/post.status.enum';
import MyPostDTO from './dto/my.post.dto';
import PostDTO from './dto/post.dto';
import UpsertPostDTO from './dto/upsert.post.dto';
import IQuery from './interfaces/IQuery';
import { Like } from 'src/entities/like.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
  ) {}

  async create(model: UpsertPostDTO, author: string): Promise<number> {
    const post: Post = {
      ...model,
      category_id: model.category_id,
      author: author,
    };

    if (model.status === PostStatusEnum.PUBLISHED) {
      post.publish_date = new Date();
    }

    const result = await this.postRepository.save(post);

    return result.id;
  }

  async getMy(author: string): Promise<MyPostDTO[]> {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .where('post.author =:author', { author: author })
      .orderBy('post.publish_date', 'DESC', 'NULLS LAST')
      .addOrderBy('post.update_at', 'DESC', 'NULLS LAST')
      .addOrderBy('post.create_at', 'DESC', 'NULLS LAST')
      .getMany();

    const result: MyPostDTO[] = posts.map((data) => {
      return {
        id: data.id,
        title: data.title,
        category_id: data.category_id,
        category_name: data.category.name,
        status: data.status as PostStatusEnum,
        publish_date: data.publish_date,
      };
    });

    return result;
  }

  async getById(id: number): Promise<PostDTO | null> {
    try {
      const data = await this.postRepository.findOne({
        relations: ['category', 'likes'],
        where: {
          id: id,
        },
      });

      const result: PostDTO = {
        id: data.id,
        title: data.title,
        content: data.content,
        status: data.status as PostStatusEnum,
        category_id: data.category_id,
        category_name: data.category.name,
        publish_date: data.publish_date,
        author: data.author,
        likes: data.likes.length,
      };

      return result;
    } catch (e) {
      return null;
    }
  }

  async update(id: number, model: UpsertPostDTO): Promise<void> {
    const dbPost = await this.postRepository.findOneBy({ id });
    const newData: Post = {
      title: model.title,
      content: model.content,
      category_id: model.category_id,
      status: model.status,
      update_at: new Date(),
    };

    if (model.status === PostStatusEnum.PUBLISHED && !dbPost.publish_date) {
      newData.publish_date = new Date();
    }

    await this.postRepository.update(dbPost.id, { ...newData });
  }

  async removeById(id: number): Promise<void> {
    const dbPost = await this.postRepository.findOneBy({ id });
    await this.postRepository.remove(dbPost);
  }

  async findWithPagination(
    query: IQuery,
  ): Promise<{ data: PostDTO[]; count: number }> {
    const take = query.take || 20;
    const skip = (query.page - 1) * query.take || 0;

    const [result, total] = await this.postRepository.findAndCount({
      relations: ['category', 'likes'],
      select: [
        'id',
        'category',
        'title',
        'status',
        'publish_date',
        'author',
        'likes',
      ],
      where: { status: PostStatusEnum.PUBLISHED },
      order: { publish_date: 'DESC' },
      take: take,
      skip: skip,
    });

    const finalData: PostDTO[] = result.map((data) => {
      return {
        id: data.id,
        title: data.title,
        category_name: data.category.name,
        status: data.status as PostStatusEnum,
        publish_date: data.publish_date,
        author: data.author,
        likes: data.likes?.length,
      };
    });

    return {
      data: finalData,
      count: total,
    };
  }

  async likePost(email: string, post_id: number): Promise<void> {
    const model: Like = {
      post_id: post_id,
      user_email: email,
    };
    await this.likeRepository.save(model);
  }

  async unlikePost(email: string, post_id: number): Promise<void> {
    const model = await this.likeRepository.findBy({
      user_email: email,
      post_id: post_id,
    });
    await this.likeRepository.remove(model);
  }
}
