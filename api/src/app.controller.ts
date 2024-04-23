import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from './auth/auth.decorator';

@Controller()
export class AppController {
  @Get('/health')
  @Public()
  @HttpCode(HttpStatus.OK)
  health(): string {
    return 'OK';
  }
}
