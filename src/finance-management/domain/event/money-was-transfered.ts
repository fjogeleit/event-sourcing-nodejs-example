import { BaseEvent } from 'fj-event-store';
import { Money } from '../money';

interface MoneyWasTransferedPaylod {
  targetAccountId: string;
  money: { amount: number; currency: string };
}

export class MoneyWasTransfered extends BaseEvent<MoneyWasTransferedPaylod> {
  static with(accountId: string, targetAccountId: string, money: Money) {
    return this.occur<MoneyWasTransferedPaylod>(accountId, {
      targetAccountId,
      money: { amount: money.amount, currency: money.currency },
    });
  }

  get accountId(): string {
    return this.aggregateId;
  }

  get targetAccountId(): string {
    return this._payload.targetAccountId;
  }

  get money(): Money {
    return new Money(this._payload.money.amount, this.payload.money.currency);
  }
}
