import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCustomerDto {
    @IsNotEmpty()
    @IsString()  
    @MaxLength(200) 
    @MinLength(2) 
    name:string;

    @IsNotEmpty()
    @IsString()  
    @MaxLength(100) 
    @MinLength(2) 
    industry:string;


}
