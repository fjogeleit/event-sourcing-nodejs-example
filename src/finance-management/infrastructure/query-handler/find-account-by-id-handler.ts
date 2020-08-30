import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { FindAccountById } from '../../domain/query';
import { AccountsReadModelFinder } from '../../read-model/accounts-finder';
import { FindAccountByIdQueryHandler } from 'src/finance-management/domain/query-handler';

@QueryHandler(FindAccountById)
export class FindAccountByIdHandler implements IQueryHandler<FindAccountById> {
  constructor(private readonly finder: AccountsReadModelFinder) {}

  async execute(query: FindAccountById) {
    return FindAccountByIdQueryHandler(this.finder)(query);
  }
}
