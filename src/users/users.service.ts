import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ where: { isDeleted: false } });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id, isDeleted: false } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async createUser(username: string, password: string): Promise<User> {
    const newUser = this.usersRepository.create({ username, password });
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async updateUser(id: number, username: string, password: string): Promise<User> {
    const user = await this.findOne(id);
    user.username = username;
    user.password = password;
    await this.usersRepository.save(user);
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.findOne(id);
    user.isDeleted = true;
    await this.usersRepository.save(user);
  }
}
