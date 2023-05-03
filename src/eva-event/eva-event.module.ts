import { forwardRef, Module } from "@nestjs/common";
import { EvaEventService } from './eva-event.service';
import { EvaEventController } from './eva-event.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "users/users.model";
import { RolesModule } from "roles/roles.module";
import { AuthModule } from "auth/auth.module";
import { EvaEvent } from "eva-event/eva_event.model";
import { Group } from "group/entities/group.model";


@Module({
  providers: [EvaEventService],
  controllers: [EvaEventController],
  imports: [
    SequelizeModule.forFeature([User, EvaEvent, Group]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [
    EvaEventService,
  ]
})
export class EvaEventModule {}
