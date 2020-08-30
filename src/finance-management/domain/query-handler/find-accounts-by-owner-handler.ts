import { AccountFinder } from '../service/account-finder';
import { FindAccountsByOwner } from '../query';

export default (finder: AccountFinder) => (query: FindAccountsByOwner) => {
    return finder.findByOwnerId(query.ownerId);
}