import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";

interface EvaEventCreationAttrs {
  userId: number
  groupId: number
  geo_lon: string
  geo_lat: string,
  date: string
  count: number
  address: string
  user_name: string
  group_name: string
  comment: string
}

@Table({ tableName: "eva_event" })
export class EvaEvent extends Model<EvaEvent, EvaEventCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  geo_lat: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  geo_lon: string;

  @Column({ type: DataType.STRING, allowNull: false })
  date: string;

  @Column({ type: DataType.STRING })
  count: string;

  @Column({ type: DataType.STRING })
  address: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING })
  user_name: string;

  @Column({ type: DataType.STRING })
  group_name: string;

  @Column({ type: DataType.STRING })
  comment: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
