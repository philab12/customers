import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt";
import { User } from 'src/users/entities/user.entity';
import {config} from "dotenv";

config();

@Injectable()
export class AuthService {
    constructor(private readonly userService:UsersService, private readonly jwtService:JwtService){}
    async validateUser(username:string, password:string):Promise<any>{
        
           const user = await this.userService.findByUsername(username);
           
           
           if(user && (await bcrypt.compare(password, user.password))) {
              const {password, ...result} = user;
              
              return result;
           }else {
            return null;
           }
    }



    async login(user:User):Promise<any>{
   

        const access_Token = this.getToken(user,"access");
        
        const refresh_Token = this.getToken(user,"refresh");;


       await this.userService.updateRfreshToken(user.id,refresh_Token);

         const  tokens = {
            user_level: user.user_level,
            username:user.username,
            access_Token,
            refresh_Token
         }

        

         return tokens;
        
    }



    public refreshToken(id:number, refreshToken, user:User){
        const valid_refreshToken = this.userService.getUserByRefresh(id,refreshToken);
        if(valid_refreshToken) return {access_token: this.getToken(user,"access") };
        throw new UnauthorizedException("Invalid RefreshToken");

    }
     


    public getToken(user:User,token_type:string){
        const payload = {
            sub: user.id,
            user_level:user.user_level,
            username: user.username
        }

        if(token_type === "access"){
        return this.jwtService.sign(payload,{secret:`${process.env.ACCESS_TOKEN_SECRET}`,expiresIn: "1m"});
        }else{
           return this.jwtService.sign(payload,{secret:`${process.env.REFRESH_TOKEN_SECRET}`,expiresIn: "1d"});
        }
    }
}
