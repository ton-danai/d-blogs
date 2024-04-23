import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    return await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
  }
}
