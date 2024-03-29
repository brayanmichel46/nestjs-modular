import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator'
import { PayloadToken } from '../models/token.model';
import { Role } from '../models/role.model';



@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles:Role[] = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler())
    if(!roles){
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken
    const isAuth = roles.some(role => role === user.role)
    if(!isAuth){
      throw new UnauthorizedException('you role is wrong');
    }
    return true;
  }
}
