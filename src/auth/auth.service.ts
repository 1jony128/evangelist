import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "../users/users.model";
import { AuthUserDto } from "auth/dto/auth-user.dto";
import { AccessKeyService } from "access-key/access-key.service";
import { GroupService } from "group/group.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private accessKeyService: AccessKeyService,
    private groupService: GroupService
  ) {}

  async login(userDto: AuthUserDto) {
    const user = await this.validateUser(userDto);
    if (!user) {
      throw new UnauthorizedException({
        message: "Некорректный емайл или пароль",
      });
    }
    const token = await this.generateToken(user);
    return {
      token: token.token,
      id: user.id,
    };
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    console.log(candidate);
    if (candidate) {
      throw new HttpException(
        "Пользователь с таким email существует",
        HttpStatus.BAD_REQUEST
      );
    }

    const { key_access, ...userDtoWithoutKeyAccess } = userDto;
    const access_key = key_access;

    // получаю группу по ключу
    const accessKey = await this.accessKeyService.getGroupByAccessKey(
      access_key
    );

    // нахожу группу по ключу и добавляю туда пользователя

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDtoWithoutKeyAccess,
      password: hashPassword,
    });

    const token = await this.generateToken(user);

    const addUserGroup = await this.groupService.addUserToGroup({
      userId: String(user.id),
      groupId: String(accessKey.accessKey.groupId),
    });

    if (!addUserGroup) {
      throw new HttpException(
        "Ошибка добавления в группу",
        HttpStatus.NOT_FOUND
      );
    }

    // удаляю ключ и заменяю на новый
    const destroyAccessKey = await this.accessKeyService.destroyAccessKey(
      accessKey.accessKey
    );

    if (!destroyAccessKey) {
      throw new HttpException("Ошибка удаления ключа", HttpStatus.NOT_FOUND);
    }

    // создаю новый ключ для группы
    const updateAccessKey = await this.accessKeyService.generateAccessKey(
      accessKey.accessKey.groupId
    );

    return {
      token: token.token,
      id: user.id,
      updateAccessKey: updateAccessKey,
    };
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: AuthUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: "Некорректный емайл или пароль",
      });
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: "Некорректный емайл или пароль",
    });
  }
}
