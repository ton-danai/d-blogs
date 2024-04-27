import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { generateSalt, hasher } from 'src/common/utils/hashHelper';
import { Like } from 'src/entities/like.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
  ) {}

  async create(email: string, password: string): Promise<number> {
    try {
      const user = await this.usersRepository.findOneBy({ email });
      console.log('user', user);
      if (user) {
        throw new Error('Something bad happened');
      }

      const salt = generateSalt();
      const hash = hasher(password, salt);
      const newUser: User = {
        email: email,
        password: hash,
        salt: salt,
      };
      const result = await this.usersRepository.save(newUser);

      console.log('result', result);
      return result.id;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByUsername(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email });
  }

  async getAllLike(email: string): Promise<number[]> {
    const result = await this.likesRepository.find({
      select: ['post_id'],
      where: { user_email: email },
    });

    return result.map((e) => e.post_id);
  }
}
