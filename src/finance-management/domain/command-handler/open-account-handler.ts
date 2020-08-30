import { AccountCollection } from '../account-collection';
import { OpenAccount } from '../command';
import { Account } from '../account';
import { IbanExistsVaidator } from '../service/iban-exists-validator';

export default (collection: AccountCollection, ibanValidator: IbanExistsVaidator) => async (command: OpenAccount): Promise<void> => {
  await ibanValidator.validate(command.iban);

  const account = Account.open(
    command.accountId,
    command.iban,
    command.bic,
    command.ownerId,
  );

  return collection.save(account);
};
