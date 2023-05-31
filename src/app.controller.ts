import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('chat')
    async getMessages(@Res() res) {
        const messages = await this.appService.getMessages()
        res.json(messages)
    }
}