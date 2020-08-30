import { IEventStore } from 'fj-event-store';
import transactionQuery from '../../query/transactions';
import { TransactionFinder } from '../../domain/service/transaction-finder';
import { Injectable, Inject } from '@nestjs/common';
import { EVENT_STORE } from '../../../event-store/constants';

@Injectable()
export class TransactionQueryFinder implements TransactionFinder {
    constructor(@Inject(EVENT_STORE) private readonly eventStore: IEventStore) {};

    findByAccountId(accountId: string) {
        return transactionQuery(this.eventStore)(accountId);
    }
}