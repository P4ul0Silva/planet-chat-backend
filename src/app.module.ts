import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Message } from './messages/entities/message.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User, Message],
      synchronize: true,
  }), UsersModule, MessagesModule, AuthModule, TypeOrmModule.forFeature([Message])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {private dataSource: DataSource}
