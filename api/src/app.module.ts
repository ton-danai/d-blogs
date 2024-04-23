import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports:[AuthModule],
  controllers: [AppController],
  providers: [ {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }],
})
export class AppModule {}
