import { Money } from '../money';

export class PerformWithdraw {
  constructor(
    public readonly accountId: string,
    public readonly amount: Money,
    public readonly reference: string,
  ) {}
}
