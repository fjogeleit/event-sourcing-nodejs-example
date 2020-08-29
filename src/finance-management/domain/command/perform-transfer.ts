import { Money } from '../money';

export class PerformTransfer {
  constructor(
    public readonly accountId: string,
    public readonly targetAccountId: string,
    public readonly amount: Money,
  ) {}
}
