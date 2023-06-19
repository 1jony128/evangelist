import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Group } from "group/entities/group.model";

interface AccessKeyCreationAttrs {
  key: string;
  groupId: number;
}

@Table
export class AccessKey extends Model<AccessKey, AccessKeyCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  key: string;

  @ForeignKey(() => Group)
  @Column
  groupId: number;
}
