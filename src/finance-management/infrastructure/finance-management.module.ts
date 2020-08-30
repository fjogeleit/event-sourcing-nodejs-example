import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FinanceManagementController } from './finance-management.controller';
import { FinanceManagementService } from './finance-management.service';
import { AccountEventStoreCollection } from '../domain/account-collection';
import { IbanExistsQueryVaidator } from './service/iban-exists-validator';
import { TransactionQueryFinder } from './service/transaction-finder'
import { AccountsReadModelFinder } from '../read-model/accounts-finder';
import CommandHandlers from './command-handler';
import QueryHandlers from './query-handler';

@Module({
  exports: [AccountEventStoreCollection],
  controllers: [FinanceManagementController],
  providers: [
    AccountsReadModelFinder, 
    IbanExistsQueryVaidator, 
    TransactionQueryFinder,
    FinanceManagementService, 
    AccountEventStoreCollection, 
    ...CommandHandlers, 
    ...QueryHandlers
  ],
  imports: [CqrsModule],
})

export class FinanceManagementModule {}
