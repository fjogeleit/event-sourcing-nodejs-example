import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PerformWithdraw } from '../../domain/command';
import { AccountEventStoreCollection } from 'src/finance-management/domain/account-collection';
import { PerformWithdrawCommandHandler } from 'src/finance-management/domain/command-handler';

@CommandHandler(PerformWithdraw)
export class PerformWithdrawHandler
  implements ICommandHandler<PerformWithdraw> {
  constructor(private readonly collection: AccountEventStoreCollection) {}

  async execute(command: PerformWithdraw) {
    return PerformWithdrawCommandHandler(this.collection)(command);
  }
}
