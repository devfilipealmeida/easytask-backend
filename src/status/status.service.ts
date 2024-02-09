/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {
  constructor(@InjectRepository(Status) private statusRepo: Repository<Status>,
  ) {}
  create(createStatusDto: CreateStatusDto) {
    const status = this.statusRepo.create(createStatusDto);
    return this.statusRepo.save(status);
  }

  findAll() {
    return this.statusRepo.find()
  }

  findOne(id: number) {
    return this.statusRepo.findOne({
      where: { id },
      relations: ['tasks']
    });
  }

  update(id: number, updateStatusDto: UpdateStatusDto) {
    return this.statusRepo.update({ id }, updateStatusDto);
  }

  remove(id: number) {
    return this.statusRepo.delete({ id });
  }
}
