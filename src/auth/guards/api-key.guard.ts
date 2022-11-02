import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import config from './../../config'

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor (
    private reflector: Reflector,
    @Inject(config.KEY) private configService : ConfigType<typeof config>
    ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //leer meta data request 
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if(isPublic){
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader= request.header('Auth');
    console.log("fgdfg",this.configService.apiKey,authHeader);
    const isAuth= authHeader===this.configService.apiKey;
    if(!isAuth){
      throw new UnauthorizedException('Not allow');
    }
    return isAuth;
  }
}
