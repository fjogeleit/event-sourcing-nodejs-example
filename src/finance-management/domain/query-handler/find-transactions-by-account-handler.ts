import { TransactionFinder } from '../service/transaction-finder';
import { FindTransactionsByAccount } from '../query';

export default (finder: TransactionFinder) => (query: FindTransactionsByAccount) => {
    return finder.findByAccountId(query.accountId);
}