import { BaseEvent } from 'fj-event-store';

interface AccountWasOpenedPayload {
  iban: string;
  bic: string;
  ownerId: string;
}

export class AccountWasOpened extends BaseEvent<AccountWasOpenedPayload> {
  static with(accountId: string, iban: string, bic: string, ownerId: string) {
    return this.occur<AccountWasOpenedPayload>(accountId, {
      iban,
      bic,
      ownerId,
    });
  }

  get accountId(): string {
    return this.aggregateId;
  }

  get ownerId(): string {
    return this._payload.ownerId;
  }

  get iban(): string {
    return this._payload.iban;
  }

  get bic(): string {
    return this._payload.bic;
  }
}
