import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {User} from "../users/users.model";
import { AuthUserDto } from "auth/dto/auth-user.dto";
import { GroupService } from "group/group.service";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private groupService: GroupService,
                private jwtService: JwtService) {}

    async login(userDto: AuthUserDto) {
        const user = await this.validateUser(userDto)
      if(!user){
        throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
      }
      const token = await this.generateToken(user)
      return {
        token: token.token,
        id: user.id
      }
    }

    async registration(userDto: CreateUserDto) {

        const candidate = await this.userService.getUserByEmail(userDto.email);
        console.log(candidate)
        if (candidate) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
        }

        const { key_access, ...userDtoWithoutKeyAccess } = userDto;

        const access_key = key_access

        if(!key_access){
          throw new HttpException('Неверный ключ доступа', HttpStatus.BAD_REQUEST);
        }




        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDtoWithoutKeyAccess, password: hashPassword})
        console.log(user)
        const token = await this.generateToken(user)

        const id = await user?.id

        return {
          token: token.token,
          id
        }
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: AuthUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if(!user){
          throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
    }
}
