import { AccountCollection } from '../account-collection';
import { OpenAccount } from '../command';
import { Account } from '../account';

export default (collection: AccountCollection) => (command: OpenAccount): Promise<void> => {
  const account = Account.open(
    command.accountId,
    command.iban,
    command.bic,
    command.ownerId,
  );

  return collection.save(account);
};
