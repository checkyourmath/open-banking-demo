import { Controller, Get, HttpCode, HttpStatus, Query, UseInterceptors } from '@nestjs/common';
import { BankingService } from './banking.service';
import { BankingConnectQuery } from './queries/banking-connect.query';
import { HttpResponseInterceptor } from '@shared/interceptors/http-response.interceptor';

@Controller('banking')
@UseInterceptors(HttpResponseInterceptor)
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
