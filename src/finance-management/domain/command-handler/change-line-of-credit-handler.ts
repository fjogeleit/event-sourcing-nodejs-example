import { AccountCollection } from '../account-collection';
import { ChangeLineOfCredit } from '../command';

export default (collection: AccountCollection) => async (command: ChangeLineOfCredit): Promise<void> => {
  const account = await collection.get(command.accountId);

  account.changeLineOfCredit(command.amount);

  return collection.save(account);
};
