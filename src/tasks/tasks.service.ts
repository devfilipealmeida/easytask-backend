/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Between, Repository } from 'typeorm';
import { Status } from 'src/status/entities/status.entity';
import { startOfDay, endOfDay } from 'date-fns';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(Status) private statusRepo: Repository<Status>,
  ) {}
  
  create(createTaskDto: CreateTaskDto) {
    const statusId = 1;
    const task = { ...createTaskDto, statusId }

    const newTask = this.taskRepo.create(task);
    return this.taskRepo.save(newTask);
  }

  findAll(userId) {
    return this.taskRepo.find({
      where: {
        userId: userId
      }
    });
  }

  findAllByDate(id) {
    const hoje = new Date();
    const inicioDoDia = startOfDay(hoje);
    const finalDoDia = endOfDay(hoje);
    return this.taskRepo.find({
      where: {
        userId: id,
        created_at: Between(inicioDoDia, finalDoDia)
      }
    });
  }

  findOne(id: string) {
    return this.taskRepo.findOne({
      where: { id: id }
    });
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskRepo.update({ id }, updateTaskDto);
  }

  remove(id: string) {
    return this.taskRepo.delete({ id });
  }
}
