import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('/login')
  async signIn(@Body() signInDto: Record<string, any>) {
    try {
      const result = await this.authService.signIn(
        signInDto.username,
        signInDto.password,
      );

      return {
        access_token: result.access_token,
        email: result.profile.email,
      };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
