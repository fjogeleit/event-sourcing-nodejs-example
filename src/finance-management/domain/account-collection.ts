import {
  AggregateRepository,
  IAggregateRepository,
  Repository,
} from 'fj-event-store';
import { Account } from './account';

export type AccountCollection = IAggregateRepository<Account>;

export const FINANCE_MANAGEMENT_STREAM = 'finance-management';

@Repository({ streamName: FINANCE_MANAGEMENT_STREAM, aggregate: Account })
export class AccountEventStoreCollection extends AggregateRepository<Account> {}
