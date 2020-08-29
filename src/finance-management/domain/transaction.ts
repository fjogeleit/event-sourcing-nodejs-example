import { Money } from './money';

export class Transaction {
  constructor(
    public readonly transactionId: string,
    public readonly amount: Money,
    public readonly reference: string,
    public readonly transacted: Date,
  ) {}
}
