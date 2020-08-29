import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChangeLineOfCredit } from '../../domain/command';
import { AccountEventStoreCollection } from 'src/finance-management/domain/account-collection';
import { ChangeLineOfCreditCommandHandler } from 'src/finance-management/domain/command-handler';

@CommandHandler(ChangeLineOfCredit)
export class ChangeLineOfCreditHandler
  implements ICommandHandler<ChangeLineOfCredit> {
  constructor(private readonly collection: AccountEventStoreCollection) {}

  async execute(command: ChangeLineOfCredit) {
    return ChangeLineOfCreditCommandHandler(this.collection)(command);
  }
}
