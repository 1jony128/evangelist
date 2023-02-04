import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {Post} from "../posts/posts.model";
import { Group } from "src/group/entities/group.model";
import { UserGroups } from "src/group/entities/user-groups.model";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
      SequelizeModule.forFeature([User, Role, UserRoles, Post, Group]),
      RolesModule,
      forwardRef(() => AuthModule),
  ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {}
