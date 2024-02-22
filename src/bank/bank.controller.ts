import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BankService } from './bank.service';
import { createCardDto } from './dto/create-card.dto';

@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) { }
  @Get(':id')
  async getCard(@Param('id') id: number) {
    return this.bankService.getCard(id)
  }
  @Post()
  async createCard(@Body() dto: createCardDto) {
    return await this.bankService.createCard(dto)
  }
  @Put(':id')
  async updateCard(@Param(('id')) id: number ,@Body() dto: createCardDto) {
    return await this.bankService.updateCard(id,dto)
  }
  @Delete(':id')
  async deleteCard(@Param(('id')) id: number) {
    return await this.bankService.deleteCard(id)
  }
}
