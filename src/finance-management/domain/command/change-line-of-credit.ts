import { Money } from '../money';

export class ChangeLineOfCredit {
  constructor(
    public readonly accountId: string,
    public readonly amount: Money,
  ) {}
}
