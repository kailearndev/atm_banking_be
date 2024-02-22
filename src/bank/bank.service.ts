import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from './entity/bank.entities';
import { Repository } from 'typeorm';
import { createCardDto } from './dto/create-card.dto';

@Injectable()
export class BankService {
  constructor(@InjectRepository(Bank) private bankRepository: Repository<Bank>) { }
  async createCard(dto: createCardDto) {
    const card = this.bankRepository.create(dto)
    return await this.bankRepository.save(card)
  }
  async getCard(id: number) {
    const card = await this.bankRepository.findOne({
      where: {
        id: id
      }
    })
    return card ? card : 'card not exist'
  }
  async updateCard(id: number, dto: createCardDto) {
    const cardUpdate = await this.bankRepository.findOne({where: {id: id}})
    const newCard = {...cardUpdate, ...dto}
    return   cardUpdate ?  await this.bankRepository.save(newCard) : 'card not exist'
  }
  async deleteCard(id: number) {
    const card = await this.bankRepository.findOne({ where: { id: id } })
    return card ? await this.bankRepository.remove(card) : 'card not exist'
  }
}
