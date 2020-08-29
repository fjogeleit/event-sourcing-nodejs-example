import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OpenAccount } from '../../domain/command';
import { AccountEventStoreCollection } from 'src/finance-management/domain/account-collection';
import { OpenAccountCommandHandler } from 'src/finance-management/domain/command-handler';

@CommandHandler(OpenAccount)
export class OpenAccountHandler implements ICommandHandler<OpenAccount> {
  constructor(private readonly collection: AccountEventStoreCollection) {}

  async execute(command: OpenAccount) {
    return OpenAccountCommandHandler(this.collection)(command);
  }
}
