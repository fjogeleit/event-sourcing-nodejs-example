import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { FindAllAccounts } from '../../domain/query';
import { AccountsReadModelFinder } from '../../read-model/accounts-finder';
import { FindAllAccountsQueryHandler } from 'src/finance-management/domain/query-handler';

@QueryHandler(FindAllAccounts)
export class FindAllAccountsHandler implements IQueryHandler<FindAllAccounts> {
  constructor(private readonly finder: AccountsReadModelFinder) {}

  async execute(query: FindAllAccounts) {
    return FindAllAccountsQueryHandler(this.finder)(query);
  }
}
