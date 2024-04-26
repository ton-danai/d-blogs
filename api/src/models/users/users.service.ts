import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(email: string, password: string): Promise<number> {
    try {
      const user = await this.usersRepository.findOneBy({ email });

      if (user) {
        throw new Error('Something bad happened');
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser: User = {
        email: email,
        password: hash,
        salt: salt,
      };
      const result = await this.usersRepository.create(newUser);
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
}
