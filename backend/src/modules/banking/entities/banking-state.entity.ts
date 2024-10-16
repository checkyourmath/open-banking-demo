import { Column, Table, Model } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'BankingState',
})
export class BankingState extends Model<BankingState> {
  @Column({
    primaryKey: true,
    type: DataTypes.STRING(255),
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataTypes.TEXT,
  })
  authorizationCode?: string;

  @Column({
    type: DataTypes.TEXT,
  })
  accessToken?: string;

  @Column({
    type: DataTypes.TEXT,
  })
  refreshToken?: string;
}
