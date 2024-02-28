import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entity/transaction.entities';
import { Bank } from 'src/bank/entity/bank.entities';

@Module({
  providers: [TransactionService],
  exports: [TransactionService],
  imports: [TypeOrmModule.forFeature([Transaction, Bank])]
})
export class TransactionModule {}
