import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { BankingService } from './banking.service';
import { BankingConnectQuery } from './queries/banking-connect.query';

@Controller('banking')
export class BankingController {
  constructor(
    private readonly bankingService: BankingService
  ) {}

  @Get('connect')
  @HttpCode(HttpStatus.OK)
  async connect(
    @Query() query: BankingConnectQuery
  ): Promise<void> {
    await this.bankingService.connect(query.code);
  }
}
