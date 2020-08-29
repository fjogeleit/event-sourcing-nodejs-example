import { Money } from '../money';

export class PerformDeposit {
  constructor(
    public readonly accountId: string,
    public readonly amount: Money,
    public readonly reference: string,
  ) {}
}
