import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerModule } from '@modules/logger/logger.module';
import { BankingController } from './banking.controller';
import { BankingService } from './banking.service';
import { BankingState } from './entities/banking-state.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([BankingState]),
    LoggerModule,
  ],
  controllers: [
    BankingController
  ],
  providers: [
    BankingService
  ],
  exports: [
    BankingService
  ]
})
export class BankingModule {}
