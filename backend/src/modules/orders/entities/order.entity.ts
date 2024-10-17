import { Column, Table, Model } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@Table({
  tableName: 'Order',
})
export class Order extends Model<Order> {
  @Column({
    primaryKey: true,
    type: DataTypes.UUIDV4,
    allowNull: false,
    defaultValue: uuidv4,
  })
  id: string;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
  })
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
  })
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  paymentLink: string;
}
