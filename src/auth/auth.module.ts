import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { AccessKeyService } from "access-key/access-key.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { AccessKey } from "access-key/entities/access-key.model";
import { GroupService } from "group/group.service";
import { Group } from "group/entities/group.model";
import { UserGroupService } from "group/user-groups.service";
import { UserGroups } from "group/entities/user-groups.model";

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccessKeyService, GroupService, UserGroupService],
  imports: [
    forwardRef(() => UsersModule),
    SequelizeModule.forFeature([AccessKey, Group, UserGroups]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECRET",
      signOptions: {
        expiresIn: "122h",
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
