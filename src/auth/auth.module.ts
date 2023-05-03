import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import { GroupModule } from "group/group.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "users/users.model";
import { Group } from "group/entities/group.model";


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      SequelizeModule.forFeature([Group]),
      forwardRef(() => UsersModule),
      forwardRef(() => GroupModule),
      JwtModule.register({
        secret: process.env.PRIVATE_KEY || 'SECRET',
        signOptions: {
          expiresIn: '24h'
        }
      })
  ],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {}
