import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import {config} from "dotenv";

config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly userService:UsersService){
        super({
            ignoreExpiration: false,
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: `${process.env.ACCESS_TOKEN_SECRET}`
        })
    }



    async validate(payload:any){
  
        return {
            id: payload.sub,
            fullname: payload.fullname,
            username: payload.username
        }

    


       }
    
}