/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Status, Task])],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
