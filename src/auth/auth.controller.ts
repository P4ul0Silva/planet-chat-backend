import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt--auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    @Post('login')
        async login(@Body() body: any) {
        return this.authService.validateUser(body.email, body.password)
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refreshToken(@Request() req) {
        return this.authService.refreshToken(req.user)
    }
}
