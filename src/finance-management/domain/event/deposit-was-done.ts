import { BaseEvent } from 'fj-event-store';
import { Money } from '../money';
import { Transaction } from '../transaction';

interface DepositWasDonePayload {
  transactionId: string;
  money: { amount: number; currency: string };
  reference: string;
}

export class DepositWasDone extends BaseEvent<DepositWasDonePayload> {
  static with(
    accountId: string,
    transactionId: string,
    deposit: Money,
    reference: string,
  ) {
    return this.occur<DepositWasDonePayload>(accountId, {
      transactionId,
      money: { amount: deposit.amount, currency: deposit.currency },
      reference,
    });
  }

  get accountId(): string {
    return this.aggregateId;
  }

  get transaction(): Transaction {
    return new Transaction(
      this._payload.transactionId,
      new Money(this._payload.money.amount, this._payload.money.currency),
      this._payload.reference,
      this.createdAt.toDate(),
    );
  }
}
