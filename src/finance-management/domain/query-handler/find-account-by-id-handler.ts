import { AccountFinder } from '../service/account-finder';
import { FindAccountById } from '../query';

export default (finder: AccountFinder) => (query: FindAccountById) => {
    return finder.findById(query.accountId);
}