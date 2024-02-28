import { Transaction } from "src/transaction/entity/transaction.entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("bank")
export class Bank {
  @PrimaryGeneratedColumn()
  id:number
  @Column()
  theme: string
  @Column({ type: 'double' })
  cardNumber: number
   @Column()
  type: string
   @Column()
  cardHolder: string
   @Column({type: 'double'})
   balance: number
  @OneToMany(() => Transaction, (transaction) => transaction.bank)
  transactions: Transaction[]
}