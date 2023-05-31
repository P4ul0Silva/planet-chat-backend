import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './messages/entities/message.entity'; 

@Injectable()
export class AppService {
 constructor(
   @InjectRepository(Message) private messageRepository: Repository<Message>,
 ) {}
 async createMessage(message: Message): Promise<Message> {
   return await this.messageRepository.save(message);
 }
 
 async getMessages(): Promise<Message[]> {
   return await this.messageRepository.find();
 }
}