import { Column, Table, Model } from 'sequelize-typescript';
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'Order',
})
export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  @Column({
    primaryKey: true,
    type: DataTypes.UUIDV4,
    allowNull: false,
    defaultValue: uuidv4,
  })
  @ApiProperty({ type: String, required: true })
  id: CreationOptional<string>;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
  })
  @ApiProperty({ type: Number, required: true })
  price: number;

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
  })
  @ApiProperty({ type: String, required: true })
  paymentId: string;

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
  })
  @ApiProperty({ type: String, required: true })
  paymentLink: string;
}
