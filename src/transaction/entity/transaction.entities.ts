import { Bank } from 'src/bank/entity/bank.entities';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'double' })
  cardNumber: number;
  @Column()
  nameHolder: string;
  @Column()
  cardId: number;
  @Column()
  content: string;
  @Column()
  type: string;
  @Column()
  bankId: number;
  @Column({ type: 'double' })
  amount: number;
  @ManyToOne(() => Bank, (bank) => bank.transactions)
  @JoinColumn({ name: 'cardId'})
  bank: Bank
}
