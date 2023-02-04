import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";

interface EvaEventCreationAttrs {
  coordinates: string,
  date: string
  count: number
  userId: number
}

@Table({tableName: 'eva_event'})
export class EvaEvent extends Model<EvaEvent, EvaEventCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    coordinates: string;

    @Column({type: DataType.STRING, allowNull: false})
    date: string;

    @Column({type: DataType.STRING})
    count: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

}


// id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// coordinates: { type: DataTypes.STRING },
// date: { type: DataTypes.DATE },
// count: { type: DataTypes.STRING }
