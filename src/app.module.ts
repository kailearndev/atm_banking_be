import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BankController } from './bank/bank.controller';
import { BankModule } from './bank/bank.module';
import { Bank } from './bank/entity/bank.entities';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionModule } from './transaction/transaction.module';
import { Transaction } from './transaction/entity/transaction.entities';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        entities: [Bank, Transaction],
        synchronize: true,
      
      }),
      inject: [ConfigService],
    }),
    BankModule,
    TransactionModule
  ],
  controllers: [AppController, BankController, TransactionController],
  providers: [AppService],
})
export class AppModule {}
