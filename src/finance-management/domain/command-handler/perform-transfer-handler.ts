import { AccountCollection } from '../account-collection';
import { PerformTransfer } from '../command';

export default (collection: AccountCollection) => async (command: PerformTransfer,): Promise<void[]> => {
  const account = await collection.get(command.accountId);
  const targetAccount = await collection.get(command.targetAccountId);

  account.transfer(targetAccount, command.amount);

  return Promise.all([
    collection.save(targetAccount),
    collection.save(account),
  ]);
};
