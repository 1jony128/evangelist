import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/users.model";
import { UserGroups } from "group/entities/user-groups.model";

interface GroupCreationAttrs {
  idParentGroup: number;
  name: string;
  password: string;
}

@Table({ tableName: "groups" })
export class Group extends Model<Group, GroupCreationAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "Благовещенск", description: "Группа" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;
  @ApiProperty({ example: "12345678", description: "Пароль" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: "Благовещенск", description: "Группа" })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  idParentGroup: string;

  @BelongsToMany(() => User, () => UserGroups)
  users: User[];
}
