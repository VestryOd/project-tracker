import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(dto: any) {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepository.create({ ...dto, password: hash });
    return this.usersRepository.save(user);
  }

  async findById(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: string, dto: any) {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    await this.usersRepository.update(id, dto);
    return this.findById(id);
  }

  async remove(id: string) {
    return this.usersRepository.delete(id);
  }

  async findAll() {
    return this.usersRepository.find();
  }
} 