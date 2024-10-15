import { ApiProperty } from '@nestjs/swagger';
import { Column, Table, Model } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'product',
})
export class Product extends Model<Product> {
  @Column({
    primaryKey: true,
    type: DataTypes.UUIDV4,
    allowNull: false,
    defaultValue: uuidv4,
  })
  @ApiProperty({ type: String, required: true })
  id: string;

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
  })
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  title: string;

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
  })
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  category: string;

  @Column({
    type: DataTypes.TEXT,
    allowNull: true,
  })
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image?: string;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
  })
  @ApiProperty({ type: Number, required: true })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
