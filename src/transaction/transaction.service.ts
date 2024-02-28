import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entity/transaction.entities';
import { TransactionDto } from './dto/transaction.dto';
import { Bank } from 'src/bank/entity/bank.entities';

@Injectable()
export class TransactionService {
  constructor(@InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
    @InjectRepository(Bank) private bankRepository: Repository<Bank>) { }

  async createTransaction(cardNumber: number,dto: TransactionDto) {
    const card = await this.bankRepository.findOne({ where: { cardNumber } });
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    if (card.balance < dto.amount) {
      throw new NotFoundException('Insufficient balance');
    }
    if(dto.type === 'send') {
      card.balance -= dto.amount;
      await this.bankRepository.save(card);
    }
    if (dto.type ==='receive') {
      card.balance += dto.amount;
      await this.bankRepository.save(card);
    }
   
    const newTransaction = this.transactionRepository.create(dto);
    return await this.transactionRepository.save(newTransaction);

    
    // const card = this.transactionRepository.findOne(
    //   {
    //     relations: {
    //       bank: true
    //     }
    //   })
    // if (card) {
      
    // }
    // else {
    //   throw new NotFoundException('CardNumber not Found')

    // }
  }
  async findTransaction(cardNumber:number) {
   const transaction =   await this.transactionRepository.find({
      where: {
       cardNumber: cardNumber
      },
     
    })
    const totalTransaction = transaction.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0,
    );

    return {
      transaction,
      totalTransaction
    }
    
}
}
