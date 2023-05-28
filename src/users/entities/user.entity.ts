import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {    

    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;
}
