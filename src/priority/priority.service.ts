/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Priority } from './entities/priority.entity';

@Injectable()
export class PriorityService {
  constructor(@InjectRepository(Priority) private priorityRepo: Repository<Priority>,
  ){}
  create(createPriorityDto: CreatePriorityDto) {
    const priority = this.priorityRepo.create(createPriorityDto)
    return this.priorityRepo.save(priority);
  }

  findAll() {
    return this.priorityRepo.find();
  }
}
