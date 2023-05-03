import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class UpdateAvatarUserDto {

    @ApiProperty({example: '12345', description: 'аватар'})
    readonly avatar: string;
}
