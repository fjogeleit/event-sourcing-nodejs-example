import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PerformDeposit } from '../../domain/command';
import { AccountEventStoreCollection } from 'src/finance-management/domain/account-collection';
import { PerformDepositCommandHandler } from 'src/finance-management/domain/command-handler';

@CommandHandler(PerformDeposit)
export class PerformDepositHandler implements ICommandHandler<PerformDeposit> {
  constructor(private readonly collection: AccountEventStoreCollection) {}

  async execute(command: PerformDeposit) {
    return PerformDepositCommandHandler(this.collection)(command);
  }
}
