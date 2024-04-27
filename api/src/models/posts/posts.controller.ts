import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import UpsertPostDTO from './dto/upsert.post.dto';
import MyPostDTO from './dto/my.post.dto';
import PostDTO from './dto/post.dto';
import { Public } from 'src/auth/auth.decorator';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  private modelValidation(model: UpsertPostDTO): boolean {
    if (!model.title) return false;
    if (!model.content) return false;
    if (!model.status) return false;
    if (!model.category_id) return false;
    return true;
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() model: UpsertPostDTO, @Req() req: Request) {
    const author = req['user'].email;
    if (!author) {
      throw new UnauthorizedException();
    }

    const canCreate = this.modelValidation(model);
    if (!canCreate) throw new BadRequestException();

    try {
      const result = await this.postsService.create(model, author);

      return {
        id: result,
      };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  async upadate(
    @Param('id') id: number,
    @Body() model: UpsertPostDTO,
    @Req() req: Request,
  ) {
    const author = req['user'].email;
    if (!author) throw new UnauthorizedException();
    if (!this.modelValidation(model)) throw new BadRequestException();

    const postDB = await this.postsService.getById(id);
    if (!postDB || postDB.author !== author) throw new BadRequestException();

    await this.postsService.update(id, model);

    return;
  }

  @Get('/my')
  async getMyPost(@Req() req: Request): Promise<MyPostDTO[]> {
    try {
      const author = req['user'].email;
      const result = await this.postsService.getMy(author);
      return result;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  @Public()
  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<PostDTO> {
    const result = await this.postsService.getById(id);

    return result;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async removeById(
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<void> {
    const author = req['user'].email;
    if (!author) throw new UnauthorizedException();

    const postDB = await this.postsService.getById(id);
    if (!postDB || postDB.author !== author) throw new BadRequestException();

    await this.postsService.removeById(id);

    return;
  }
}
