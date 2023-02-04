import { forwardRef, Module } from "@nestjs/common";
import { EvaEventService } from './eva-event.service';
import { EvaEventController } from './eva-event.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "src/users/users.model";
import { RolesModule } from "src/roles/roles.module";
import { AuthModule } from "src/auth/auth.module";
import { EvaEvent } from "src/eva-event/eva_event.model";


@Module({
  providers: [EvaEventService],
  controllers: [EvaEventController],
  imports: [
    SequelizeModule.forFeature([User, EvaEvent]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [
    EvaEventService,
  ]
})
export class EvaEventModule {}
