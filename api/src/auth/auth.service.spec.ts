import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersModule } from '../models/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../common/constants/jwt.constant';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be verifed access token - Passed Case', async () => {
    const data = await service.signIn('admin', 'changeme');
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const result = jwtService.verify(data.access_token);
    expect(result.username).toBe('admin');
    expect(result.roles.includes('admin')).toBeTruthy();
    expect(result.exp).toBeLessThan(date.getTime());
  });

  it('should be verifed access token - Failed Case', async () => {
    // generate jwt from only website and sign with different key
    const data = {
      access_token:
        'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiW1wiYWRtaW5cIl0iLCJzdWIiOiJlYjhhOTE2Mi00YzAwLTQxOGYtYTFiOC0yNDg0YzI5NzgxYmMiLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNzEwNjcyNjg0LCJpYXQiOjE3MTA2NjU0ODR9.c5l-gOzOtmyhk3X22jbWyFBtuZeG0W-Krb2pKdjlI5w',
    };

    expect(() => jwtService.verify(data.access_token)).toThrow();
  });
});
