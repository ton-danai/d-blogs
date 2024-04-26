import { Module } from '@nestjs/common';
import { MasterdataController } from './masterdata.controller';
import { MasterdataService } from './masterdata.service';
import { Category } from 'src/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [MasterdataController],
  providers: [
    MasterdataService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class MasterdataModule {}
