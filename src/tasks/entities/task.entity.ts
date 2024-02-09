/* eslint-disable prettier/prettier */

import { Status } from "src/status/entities/status.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    task_title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    conclusion_date: Date;

    @ManyToOne(() => Status, status => status.tasks)
    status: Status;

    @Column()
    priority: string;

    @Column({ type: 'uuid' })
    userId: string;

    @ManyToOne(() => User, user => user.tasks)
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    statusId: number;
}
