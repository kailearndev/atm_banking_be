import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("bank")
export class Bank {
  @PrimaryGeneratedColumn()
  id:number
  @Column()
  theme: string
   @Column()
  cardNumber: string
   @Column()
  type: string
   @Column()
  cardHolder: string
   @Column()
   balance: string
}