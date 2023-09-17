import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepo:Repository<User>){}

  
  async create(createUserDto: CreateUserDto): Promise<User> {
    //Check If User Exist
    const user = await this.findByUsername(createUserDto.username);
    if(user) throw new HttpException("User Already Exist",HttpStatus.CONFLICT);
    //Encrypt Password
    //Get Salt from bcrypt
    const SALT = await bcrypt.genSalt();
    const newPass = await bcrypt.hash(createUserDto.password,SALT);

    //Insert Into Repo
    const newUser = this.userRepo.create({...createUserDto,password:newPass});
    return this.userRepo.save(newUser);
  }

  async findByUsername(username:string) : Promise<User>{
    return await this.userRepo.findOne({where:{username}});

  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOne({where:{id}});
    if(!user) throw new HttpException("User Does Not Exist", HttpStatus.NOT_FOUND);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user_exist = await this.userRepo.findOne({where:{username:updateUserDto.username, id:Not(id)}})
    //If Out If Another User Has Same Username
    if(user_exist) throw new HttpException("Username Already Exist", HttpStatus.CONFLICT);
    //Check If Password encrypted 
    const user = await this.userRepo.update(id, updateUserDto)
    if(!user) throw new HttpException("User Update Did Not Succeed", HttpStatus.INTERNAL_SERVER_ERROR); 
    return this.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    const delUser = await this.userRepo.delete(id);
    if(!delUser) throw new HttpException("Could Not Delete User", HttpStatus.INTERNAL_SERVER_ERROR);
    return "User Deleted Successfully";
  }



  async getUserByRefresh(id, refreshToken: string) : Promise<any>{
   // console.log(refreshToken);
    const getData = await this.userRepo.findOne({where:{id, refreshToken}});

    if(!getData) return BadRequestException;
    return true
    // const {password, ...result} = getData;
    // console.log(result)
    // return result;
}

async updateRfreshToken(id:number, refreshToken:string){
  await this.userRepo.update(id, {refreshToken:refreshToken});
  return this.findOne(id);
}
}
