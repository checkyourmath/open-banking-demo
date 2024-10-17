import { Column, Table, Model } from 'sequelize-typescript';
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'OrderProduct',
})
export class OrderProduct extends Model<InferAttributes<OrderProduct>, InferCreationAttributes<OrderProduct>> {
  @Column({
    primaryKey: true,
    type: DataTypes.UUIDV4,
    allowNull: false,
    defaultValue: uuidv4,
  })
  id: CreationOptional<string>;

  @Column({
    type: DataTypes.UUIDV4,
    allowNull: false,
  })
  orderId: string;

  @Column({
    type: DataTypes.UUIDV4,
    allowNull: false,
  })
  productId: string;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  quantity: number;
}
