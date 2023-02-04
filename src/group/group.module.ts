import { forwardRef, Module } from "@nestjs/common";
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "src/users/users.model";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";
import { UserGroups } from "src/group/entities/user-groups.model";
import { Group } from "src/group/entities/group.model";
import { UserGroupService } from "src/group/user-groups.service";

@Module({
  controllers: [GroupController],
  providers: [GroupService, UserGroupService],
  imports: [
    SequelizeModule.forFeature([User, UserGroups, Group]),
    forwardRef(() => AuthModule),
    UsersModule,
  ],

})
export class GroupModule {}
