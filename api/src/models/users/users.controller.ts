import {
  Controller,
  Post,
  InternalServerErrorException,
  Body,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import UserRegisterDTO from './dto/user.register.dto';
import { Public } from 'src/auth/auth.decorator';
// import UserDTO from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  @Public()
  async createUser(@Body() model: UserRegisterDTO) {
    try {
      const userId = await this.usersService.create(
        model.email,
        model.password,
      );

      return { userId: userId };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  @Get('/')
  @Public()
  async getAll() {
    const result = await this.usersService.findAll();
    return {
      data: result,
    };
  }
}
