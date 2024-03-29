import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt'
import { User } from 'src/users/entities/user.entity';
import { PayloadToken } from '../models/token.model';
@Injectable()
export class AuthService {
    constructor (
        private usersService: UsersService,
        private jwtService: JwtService
    ){}
    
    async validateUser(email: string,password) {
        const user = await this.usersService.findByEmail(email);
        const isMatch = user ? await bcrypt.compare(password, user.password):null;
        if(user && isMatch){
            const { password, ...rta } = user.toJSON();
            return rta;
        }
        return null;
    }

    generateJWT(user: User){
        const payload:PayloadToken = { role: user.role, sub: user._id };
        console.log(user);
        console.log(user.id);
        return {
            access_token: this.jwtService.sign(payload),
            user
        }
    }
}
