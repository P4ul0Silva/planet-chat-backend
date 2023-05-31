import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {


    readonly userId: string;
    
    @IsNotEmpty()
    firstName: string;
    @IsNotEmpty()
    lastName: string;
    
    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    password: string;
}
