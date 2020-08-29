import { BaseEvent } from 'fj-event-store';
import { Money } from '../money';

interface LineOfCreditWasChangedPayload {
  lineOfCredit: { amount: number; currency: string };
}

export class LineOfCreditWasChanged extends BaseEvent<
  LineOfCreditWasChangedPayload
> {
  static with(accountId: string, deposit: Money) {
    return this.occur<LineOfCreditWasChangedPayload>(accountId, {
      lineOfCredit: { amount: deposit.amount, currency: deposit.currency },
    });
  }

  get accountId(): string {
    return this.aggregateId;
  }

  get lineOfCredit(): Money {
    return new Money(
      this._payload.lineOfCredit.amount,
      this._payload.lineOfCredit.currency,
    );
  }
}
