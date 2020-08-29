import { AccountCollection } from '../account-collection';
import { PerformDeposit } from '../command';

export default (collection: AccountCollection) => async (command: PerformDeposit): Promise<void> => {
  const account = await collection.get(command.accountId);

  account.deposit(command.amount, command.reference);

  return collection.save(account);
};
