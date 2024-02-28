import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './dto/transaction.dto';
import { BankService } from 'src/bank/bank.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService,
    private readonly bankService: BankService,
  ) { }

  @Get(':cardNumber')
  async getTransaction (@Param('cardNumber') cardNumber: number) {
    return await this.transactionService.findTransaction(cardNumber)
  }
  @Post()
  async createTransaction(@Body() dto: TransactionDto) {
    const idCard = await this.bankService.getCard(dto.cardNumber)
    if (idCard) {
      const newTransaction = await this.transactionService.createTransaction(dto.cardNumber,dto)
      return newTransaction

    }
  }


}
