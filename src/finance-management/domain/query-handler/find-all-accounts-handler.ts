import { AccountFinder } from '../service/account-finder';
import { FindAllAccounts } from '../query';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (finder: AccountFinder) => (query: FindAllAccounts) => {
    return finder.findAll();
}