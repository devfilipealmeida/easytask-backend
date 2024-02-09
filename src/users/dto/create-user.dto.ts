/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    id: string;

    @IsString()
    @MaxLength(255)
    @MinLength(1)
    @IsNotEmpty()
    name: string;

    @MaxLength(255)
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    password: string;
}
