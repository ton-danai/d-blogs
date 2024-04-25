import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create user', async () => {
    const id = await service.create('Ton', 'ton@gmail.com');
    const user = await service.findById(id);

    expect(user.email).toEqual('ton@gmail.com');
    expect(user.id).toBe(id);
  });

  it('should be error whiling create user duplicate', async () => {
    try {
      await service.create('Ton', 'ton@gmail.com');
      async () => await service.create('Ton', 'ton@gmail.com');
    } catch (e) {
      expect(e).toEqual(new Error('Something bad happened'));
    }
  });
});
