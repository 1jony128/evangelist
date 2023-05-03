import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class UpdateUserDto {

    @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: "Некорректный email"})
    readonly email: string;
    @ApiProperty({example: '12345', description: 'пароль'})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
    readonly password: string;
    @ApiProperty({example: '12345', description: 'имя'})
    @IsString({message: 'Должно быть строкой'})
    readonly name: string;
    @ApiProperty({example: '12345', description: 'аватар'})
    @IsString({message: 'Должно быть строкой'})
    readonly avatar: string;
    @IsString({message: 'Должно быть строкой'})
    readonly geo_lon: string
    @IsString({message: 'Должно быть строкой'})
    readonly geo_lat: string
}
