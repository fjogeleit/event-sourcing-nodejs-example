import { AccountFinder } from '../service/account-finder';
import { FindAccountById } from '../query';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (finder: AccountFinder) => (query: FindAccountById) => {
    return finder.findById(query.accountId);
}