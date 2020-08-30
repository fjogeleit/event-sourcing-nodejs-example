import { Transaction } from '../transaction';

export interface TransactionFinder {
    findByAccountId(accountId: string): Promise<Transaction[]>
}