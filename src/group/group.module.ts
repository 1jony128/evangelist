import { forwardRef, Module } from "@nestjs/common";
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "users/users.model";
import { AuthModule } from "auth/auth.module";
import { UsersModule } from "users/users.module";
import { UserGroups } from "group/entities/user-groups.model";
import { Group } from "group/entities/group.model";
import { UserGroupService } from "group/user-groups.service";
import { RolesModule } from "roles/roles.module";

@Module({
  controllers: [GroupController],
  providers: [GroupService, UserGroupService],
  imports: [
    SequelizeModule.forFeature([User, UserGroups, Group]),
    forwardRef(() => AuthModule),
    UsersModule,
    RolesModule,
  ],
  exports: [
    GroupService,
]

})
export class GroupModule {}
