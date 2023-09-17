import { IsEnum, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
     @IsNotEmpty()
     @IsString()
     @MaxLength(200)
     @MinLength(2)
    fullname:string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @MinLength(2)
    username:string;

    @IsEnum(UserRole)
    @IsNotEmpty()
    user_level:UserRole;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({
        minLength: 5,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
      })
    password:string;


}
