import { Controller } from '@nestjs/common';
import { BankingService } from './banking.service';

@Controller('banking')
export class BankingController {
  constructor(
    private readonly bankingService: BankingService
  ) {}

}
