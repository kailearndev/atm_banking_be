import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BankService } from './bank.service';
import { createCardDto } from './dto/create-card.dto';
import { TransferMoneyDto } from './dto/transfer-money.dto';

@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) { }
  @Get(':cardNumber')

  async getCard(@Param('cardNumber') cardNumber: number) {
    return await this.bankService.getCard(cardNumber)
  }
  @Get()
  async getAllCard() {
    return this.bankService.getAllCard()
  }
  
  @Post()
  async createCard(@Body() dto: createCardDto) {
    return await this.bankService.createCard(dto)
  }
  @Put(':id')
  async updateCard(@Param(('id')) id: number ,@Body() dto: createCardDto) {
    return await this.bankService.updateCard(id,dto)
  }
  @Put(':id')
  async updateCardTheme(@Param(('id')) id: number, @Body() dto: createCardDto, theme: string) {
    return await this.bankService.updateCardTheme(id, dto,theme)
  }
  @Delete(':id')
  async deleteCard(@Param(('id')) id: number) {
    return await this.bankService.deleteCard(id)
  }

  // @Post('transfer')
  // async transferMoney(@Body() transferDto: TransferMoneyDto) {
  //   return await this.bankService.transferMoney(transferDto)
  // }
}
