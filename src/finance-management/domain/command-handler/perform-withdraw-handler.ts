import { AccountCollection } from '../account-collection';
import { PerformWithdraw } from '../command';

export default (collection: AccountCollection) => async (command: PerformWithdraw): Promise<void> => {
  const account = await collection.get(command.accountId);

  account.withdraw(command.amount, command.reference);

  return collection.save(account);
};
