import { Column, Table, Model } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'OrderProduct',
})
export class OrderProduct extends Model<OrderProduct> {
  @Column({
    primaryKey: true,
    type: DataTypes.UUIDV4,
    allowNull: false,
    defaultValue: uuidv4,
  })
  id: string;


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
