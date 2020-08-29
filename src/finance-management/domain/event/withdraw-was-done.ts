import { BaseEvent } from 'fj-event-store';
import { Money } from '../money';
import { Transaction } from '../transaction';

interface WithdrawWasDonePayload {
  transactionId: string;
  money: { amount: number; currency: string };
  reference: string;
}

export class WithdrawWasDone extends BaseEvent<WithdrawWasDonePayload> {
  static with(
    accountId: string,
    transactionId: string,
    withdraw: Money,
    reference: string,
  ) {
    return this.occur<WithdrawWasDonePayload>(accountId, {
      transactionId,
      money: { amount: withdraw.amount, currency: withdraw.currency },
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
