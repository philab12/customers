import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthLocalGuard } from './guards/auth-local.guards';
import { AuthService } from './auth.service';
//import { Response, Request } from 'express';
import { JwtRefreshGuard } from './guards/jwt-refresh-guard.guard';
import { SimpleConsoleLogger } from 'typeorm';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @UseGuards(AuthLocalGuard)
    @Post("login")
    async login(@Req() req){
        const token = await this.authService.login(req.user);
       // res.cookie("refresh-jwt",token.refresh_Token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure:true, sameSite:"none"})
        return {access_token:token.access_Token, refresh_token:token.refresh_Token, user_level:token.user_level, username:token.username};
    }


    @UseGuards(JwtRefreshGuard)
    @Get("refresh")
    async refresh(@Req() req){
        // const access_token = this.authService.getToken(req.user,"access");
        // const user_level = req.user["user_level"];
        // const username = req.user["username"];
        // return {
        //     access_token,
        //     user_level,
        //     username
        // };

        return this.authService.refreshToken(req.user["sub"], req.user["refreshToken"], req.user)

        // return {
        //     id: req.user["sub"],
        //     user_level: req.user["user_level"],
        //     refreshToken: req.user["refreshToken"]
        // }
        //return await this.authService.refreshTokens(req.user["id"], req.user["refreshToken"])
    }
}
