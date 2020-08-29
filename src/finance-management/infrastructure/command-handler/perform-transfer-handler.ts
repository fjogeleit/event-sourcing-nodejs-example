import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PerformTransfer } from '../../domain/command';
import { AccountEventStoreCollection } from 'src/finance-management/domain/account-collection';
import { PerformTransferCommandHandler } from 'src/finance-management/domain/command-handler';

@CommandHandler(PerformTransfer)
export class PerformTransferHandler
  implements ICommandHandler<PerformTransfer> {
  constructor(private readonly collection: AccountEventStoreCollection) {}

  async execute(command: PerformTransfer) {
    return PerformTransferCommandHandler(this.collection)(command);
  }
}
