import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { dataBaseConfig } from '@database/database.config';
import { ConfigHelper } from '@shared/helpers/config.heper';
import { LoggerModule } from '@modules/logger/logger.module';
import { ProductsModule } from '@modules/products/products.module';
import { BankingModule } from '@modules/banking/banking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [ConfigHelper.getEnvironmentSettings],
    }),
    LoggerModule,
    SequelizeModule.forRoot(dataBaseConfig),
    ProductsModule,
    BankingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
