import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import UserDTO from './dto/user.dto';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    const service = module.get<UsersService>(UsersService);
    await service.create('danai', 'danai.thit@gmail.com');
    await service.create('tester', 'tester@gmail.com');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get & search', () => {
    it('should return all user', async () => {
      const users = await controller.getUsers();
      expect(users.length).toBe(4);
    });

    it('should return user danai', async () => {
      const users = await controller.getUsers('danai');
      expect(users.length).toBe(1);
      expect(users.every((e) => e.email.includes('danai'))).toBeTruthy();
      expect(users.every((e) => e.givenName.includes('danai'))).toBeTruthy();
    });

    it('should return user find by id', async () => {
      const user: UserDTO = { givenName: 'new', email: 'new@pi.com' };
      const { userId } = await controller.createUser(user);
      const target = await controller.getUserById(userId);

      expect(target.email).toBe('new@pi.com');
      expect(target.givenName).toBe('new');
    });
  });

  describe('Create User', () => {
    it('should create user', async () => {
      const user: UserDTO = { givenName: 'new', email: 'new@pi.com' };

      const { userId } = await controller.createUser(user);
      const users = await controller.getUsers();
      const target = users.find((e) => e.id === userId);
      expect(userId).not.toBeNull();
      expect(target.givenName).toBe('new');
      expect(target.email).toBe('new@pi.com');
    });
  });

  describe('Update User', () => {
    it('should update user', async () => {
      const user: UserDTO = { givenName: 'new', email: 'new@pi.com' };

      const { userId } = await controller.createUser(user);
      user.givenName = 'old';
      user.email = 'new-old@pi.com';

      const newData = await controller.updateUser(userId, user);
      expect(newData.givenName).toBe('old');
      expect(newData.email).toBe('new-old@pi.com');
    });
  });

  describe('Delete User', () => {
    it('should delete user', async () => {
      const user: UserDTO = { givenName: 'new', email: 'new@pi.com' };

      const { userId } = await controller.createUser(user);
      const users = await controller.getUsers();

      expect(
        users.some((e) => e.id === userId && e.givenName === 'new' && e.email),
      ).toBeTruthy();

      const result = await controller.deleteUser(userId);
      expect(result).toBe('OK');
      const usersAfterDelete = await controller.getUsers();
      expect(usersAfterDelete.find((e) => e.id === userId)).toBe(undefined);
    });
  });
});
