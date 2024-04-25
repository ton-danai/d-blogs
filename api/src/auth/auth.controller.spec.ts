import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../models/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../common/constants/jwt.constant';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '24h' },
        }),
      ],
      providers: [AuthService],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be get access token', async () => {
    const result = await controller.signIn({
      username: 'admin',
      password: 'changeme',
    });
    expect(result.access_token).toBeTruthy();
  });

  it('should be unauthorized exception', async () => {
    try {
      await controller.signIn({
        username: 'admin',
        password: 'wrongpassword',
      });
    } catch (e) {
      expect(e.status).toBe(401);
      expect(e.response.statusCode).toBe(401);
    }
  });
});
