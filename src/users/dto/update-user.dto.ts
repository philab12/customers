import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    @MinLength(2)
   fullname:string;

   @IsEnum(UserRole)
   @IsNotEmpty()
   user_level:UserRole;

   refreshToken:string;

   @IsNotEmpty()
   @IsString()
   @MaxLength(50)
   @MinLength(2)
   username:string;
}
