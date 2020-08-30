import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { FindAccountsByOwner } from '../../domain/query';
import { AccountsReadModelFinder } from '../../read-model/accounts-finder';
import { FindAccountsByOwnerQueryHandler } from 'src/finance-management/domain/query-handler';

@QueryHandler(FindAccountsByOwner)
export class FindAccountsByOwnerHandler implements IQueryHandler<FindAccountsByOwner> {
  constructor(private readonly finder: AccountsReadModelFinder) {}

  async execute(query: FindAccountsByOwner) {
    return FindAccountsByOwnerQueryHandler(this.finder)(query);
  }
}
