import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FinanceManagementController } from './finance-management.controller';
import { FinanceManagementService } from './finance-management.service';
import CommandHandlers from './command-handler';
import { AccountEventStoreCollection } from '../domain/account-collection';
import { IbanExistsQueryVaidator } from './service/iban-exists-validator';

@Module({
  exports: [AccountEventStoreCollection],
  controllers: [FinanceManagementController],
  providers: [IbanExistsQueryVaidator, FinanceManagementService, AccountEventStoreCollection, ...CommandHandlers],
  imports: [CqrsModule],
})
export class FinanceManagementModule {}
