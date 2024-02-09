/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>,
  ) {}

 async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userRepo.findOne({
        where: {
          email: createUserDto.email
        }
      });
      if (existingUser) {
        throw new ConflictException('E-mail já está em uso.');
      }
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = this.userRepo.create({
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
      });
      return await this.userRepo.save(newUser);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.userRepo.find()
  }

  findOne(id: string) {
    return this.userRepo.findOne({
      where: { id },
      relations: ['tasks']
    })
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepo.update({ id }, updateUserDto);
  }

  remove(id: string) {
    return this.userRepo.delete({ id });
  }
}
