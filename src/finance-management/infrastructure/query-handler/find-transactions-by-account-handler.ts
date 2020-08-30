import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { FindTransactionsByAccount } from '../../domain/query';
import { FindTransactionsByAccountQueryHandler } from 'src/finance-management/domain/query-handler';
import { TransactionQueryFinder } from '../service/transaction-finder';

@QueryHandler(FindTransactionsByAccount)
export class FindTransactionsByAccountHandler implements IQueryHandler<FindTransactionsByAccount> {
  constructor(private readonly finder: TransactionQueryFinder) {}

  async execute(query: FindTransactionsByAccount) {
    return FindTransactionsByAccountQueryHandler(this.finder)(query);
  }
}
