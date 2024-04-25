import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { PostsController } from './posts.controller';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [
    PostsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class PostsModule {}
