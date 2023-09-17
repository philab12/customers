import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import { Request } from 'express';
import {config} from "dotenv";

config();

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy,'jwt-refresh'){
    constructor(private readonly userService:UsersService){
        // super({
        //     ignoreExpiration: false,
        //     jwtFromRequest: ExtractJwt.fromExtractors([
        //         (request:Request) => {
        //             const secreData = request?.cookies["refresh-jwt"];
        //             return secreData;
        //         }

        //     ]),
        //     secretOrKey: `${process.env.REFRESH_TOKEN_SECRET}`,
        //     passReqToCallback: true,
        // })


        
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                //ignoreExpiration: false,
                secretOrKey: `${process.env.REFRESH_TOKEN_SECRET}`,
                passReqToCallback: true,
            })
        }
    

    


    // async  validate(req:Request, payload:any){
    //     console.log(req)
    //     if(!payload){
    //      throw new UnauthorizedException();
    //     }
 
    //     if(!req?.cookies["refresh-jwt"]){
    //      throw new UnauthorizedException();
    //     }
 
    //    // console.log(req?.cookies["refresh-jwt"]);
 
    //     const token = req?.cookies["refresh-jwt"];
        
    //     return this.userService.getUserByRefresh(token);
    //  }


        validate(req:Request, payload:any){
        const refreshToken = req.get("Authorization").replace('Bearer', '').trim();
        return {
            ...payload,
            refreshToken
        }
    }
}