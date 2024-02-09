/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/entities/task.entity';
import { StatusModule } from './status/status.module';
import { Status } from './status/entities/status.entity';
import { AuthModule } from './auth/auth.module';
import { PriorityModule } from './priority/priority.module';
import { Priority } from './priority/entities/priority.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'taskeasy',
      entities: [User, Task, Status, Priority],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    TasksModule,
    StatusModule,
    AuthModule,
    PriorityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
