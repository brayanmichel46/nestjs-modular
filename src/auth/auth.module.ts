import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt'
import config from 'src/config';
import { ConfigType } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory:(configService: ConfigType<typeof config>)=>{
        return {
          secret: configService.jwtSecret,
          signOptions: {
          expiresIn: '10d'
          }
        }
      }  
    })
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
