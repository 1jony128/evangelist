import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { Post } from "../posts/posts.model";
import { Group } from "group/entities/group.model";
import { UserGroups } from "group/entities/user-groups.model";

interface UserCreationAttrs {
  email: string;
  password: string;
  name: string;
  avatar: string;
  geo_lon: string
  geo_lat: string,
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "user@mail.ru", description: "Почтовый адрес" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @ApiProperty({ example: "12345678", description: "Пароль" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: "true", description: "Забанен или нет" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: "За хулиганство", description: "Причина блокировки" })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;

  @BelongsToMany(() => Group, () => UserGroups)
  groups: User[];

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @ApiProperty({ example: "Евгений", description: "Имя пользователя" })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: "https:dadsasd", description: "аватар" })
  @Column({ type: DataType.STRING, allowNull: false })
  avatar: string

  @Column({ type: DataType.STRING, allowNull: true })
  geo_lat: string;

  @Column({ type: DataType.STRING, allowNull: true })
  geo_lon: string;
}
