import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
   } from 'typeorm';
    
   @Entity('messages')
   export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    userName: string;

    @Column()
    email: string;
    
    @Column()
    text: string;
    
    @CreateDateColumn()
    createdAt: Date;
   }