import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import {Post} from "./posts/posts.model";
import { FilesModule } from './files/files.module';
import { EvaEventModule } from './eva-event/eva-event.module';
import { GroupModule } from './group/group.module';
import * as path from 'path';
import { UserGroups } from "group/entities/user-groups.model";
import { Group } from "group/entities/group.model";
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
           envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRESS_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRESS_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Post, UserGroups, Group],
            autoLoadModels: true,
            synchronize: true
        }),
        ServeStaticModule.forRoot({
          rootPath: path.resolve(__dirname, 'static'),
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
        EvaEventModule,
        GroupModule,
    ]
})
export class AppModule {}
