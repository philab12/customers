import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthLocalStartegy extends PassportStrategy(Strategy){
    constructor(private readonly authService:AuthService){
        super();
    }

    async validate(username:string, password:string): Promise<any>{
         const user = await this.authService.validateUser(username, password);
         if(user) return user;
         throw new UnauthorizedException;
    }
}