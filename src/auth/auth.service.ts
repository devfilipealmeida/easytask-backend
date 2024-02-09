/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
              @InjectRepository(User) private userRepo: Repository<User>
             ) {}

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({
      where: {
        email: email
      }
    })

    if (!user) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }

    const payload = { sub: user.id, username: user.name };

    return {
      user_id: user.id,
      user_name: user.name,
      access_token: this.jwtService.sign(payload),
    };
  }
}
