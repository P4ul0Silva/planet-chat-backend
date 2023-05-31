import { IsNotEmpty } from "class-validator";

export class CreateMessageDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    createdAt: Date;
}
