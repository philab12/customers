import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthLocalStartegy } from './strategies/auth.local.startegy';
import { RefreshStrategy } from './strategies/refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [JwtModule.register({}), UsersModule],
    providers: [AuthService, AuthLocalStartegy, JwtStrategy, RefreshStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
