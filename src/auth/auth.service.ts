import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface userLogin {
    email: string,
    password: string
}

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        // if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user && passwordValid) {
            return await this.login(user)
        }

        throw new UnauthorizedException("Invalid email or password")
    }
    

    async login(user: userLogin) {
        const payload = {
          username: user.email,
          sub: {
            name: user.email,
          },
        };
    
        return {
          ...user,
          accessToken: this.jwtService.sign(payload, { secret: process.env.SUPER_SECRET}),
          refreshToken: this.jwtService.sign(payload, { expiresIn: '7d', secret: process.env.SUPER_SECRET}),
        };
      }
    
      async refreshToken(user: userLogin) {
        const payload = {
          username: user.email,
          sub: {
            name: user.email,
          },
        };
    
        return {
          accessToken: this.jwtService.sign(payload),
        };
      }
}