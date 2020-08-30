import { AccountFinder } from '../service/account-finder';
import { FindAccountsByOwner } from '../query';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (finder: AccountFinder) => (query: FindAccountsByOwner) => {
    return finder.findByOwnerId(query.ownerId);
}