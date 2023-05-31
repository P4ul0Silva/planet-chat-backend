import { Controller, Body, Post, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh-jwt--auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    @Post('login')
    @UsePipes(new ValidationPipe())
        async login(@Body() body: any) {
        return this.authService.validateUser(body.email, body.password)
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refreshToken(@Request() req) {
        return await this.authService.refreshToken(req.user)
    }
}
