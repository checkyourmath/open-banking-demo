import { Controller, Get, HttpCode, HttpStatus, Param, Query, UseInterceptors } from '@nestjs/common';
import { BankingService } from './banking.service';
import { BankingConnectQuery } from './queries/banking-connect.query';
import { HttpResponseInterceptor } from '@shared/interceptors/http-response.interceptor';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SingleIdParams } from '@shared/params/single-id.params';
import { Payment } from '@modules/banking/entities/payment.entity';

@Controller('banking')
@ApiTags('banking')
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

  @Get('payment/:id')
  @ApiResponse({ type: Payment })
  async getPayment(
    @Param() { id }: SingleIdParams
  ): Promise<Payment> {
    return this.bankingService.getPayment(id);
  }
}
