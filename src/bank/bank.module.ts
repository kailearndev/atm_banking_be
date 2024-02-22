import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './entity/bank.entities';

@Module({
  providers: [BankService],
  imports: [TypeOrmModule.forFeature([Bank])],
  exports: [BankService]
})
export class BankModule {}
