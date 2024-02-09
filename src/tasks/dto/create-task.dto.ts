/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTaskDto {
    id: string;
    
    @IsString()
    @MaxLength(255)
    @MinLength(1)
    @IsNotEmpty()
    task_title: string;

    @IsString()
    @MaxLength(255)
    description: string;

    @IsString()
    conclusion_date: Date;

    @IsString()
    @IsNotEmpty()
    priority: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    statusId: number;
}
