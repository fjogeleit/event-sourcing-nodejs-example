import { AbstractAggregate, IEventConstructor } from 'fj-event-store';
import { AccountWasOpened } from './event/account-was-opened';
import { Money } from './money';
import { Transaction } from './transaction';
import { DepositWasDone } from './event/deposit-was-done';
import { WithdrawWasDone } from './event/withdraw-was-done';
import { MoneyWasTransfered } from './event/money-was-transfered';
import { LineOfCreditWasChanged } from './event/line-of-credit-was-changed';

export class Account extends AbstractAggregate {
  #accountId: string;
  #balance: Money;
  #iban: string;
  #bic: string;
  #ownerId: string;
  #opened: Date;

  #lineOfCredit: Money;

  #transactions: Transaction[];

  public get accountId(): string {
    return this.#accountId;
  }

  public get balance(): Money {
    return this.#balance;
  }

  public get iban(): string {
    return this.#iban;
  }

  public get bic(): string {
    return this.#bic;
  }

  public get ownerId(): string {
    return this.#ownerId;
  }

  public get opened(): Date {
    return this.#opened;
  }

  public get nextTransactionId(): string {
    return 'T' + (this.#transactions.length + 1).toString().padStart(10, '0');
  }

  public static open(
    accountId: string,
    iban: string,
    bic: string,
    ownerId: string,
  ): Account {
    const self = new this();

    self._recordThat(AccountWasOpened.with(accountId, iban, bic, ownerId));

    return self;
  }

  public changeLineOfCredit(lineOfCredit: Money): void {
    this._recordThat(
      LineOfCreditWasChanged.with(this.#accountId, lineOfCredit),
    );
  }

  public deposit(amount: Money, reference: string): void {
    this._recordThat(
      DepositWasDone.with(
        this.#accountId,
        this.nextTransactionId,
        amount,
        reference,
      ),
    );
  }

  public withdraw(amount: Money, reference: string): void {
    if (this.#balance.sub(amount).greatherThan(this.#lineOfCredit) === false) {
      throw Error(
        `Not enough Money to sub ${amount.amount} ${amount.currency}`,
      );
    }

    this._recordThat(
      WithdrawWasDone.with(
        this.#accountId,
        this.nextTransactionId,
        amount,
        reference,
      ),
    );
  }

  public transfer(target: Account, amount: Money): void {
    if (this.#balance.sub(amount).greatherThan(this.#lineOfCredit) === false) {
      throw Error(
        `Not enough Money to sub ${amount.amount} ${amount.currency}`,
      );
    }

    this._recordThat(
      WithdrawWasDone.with(
        this.#accountId,
        this.nextTransactionId,
        amount,
        `Transfer to ${target.iban}`,
      ),
    );

    target.deposit(amount, `Transfer from ${this.iban}`);

    this._recordThat(
      MoneyWasTransfered.with(this.#accountId, target.accountId, amount),
    );
  }

  protected _whenLineOfCreditWasChanged(event: LineOfCreditWasChanged) {
    this.#lineOfCredit = new Money(Math.abs(event.lineOfCredit.amount) * -1, event.lineOfCredit.currency);
  }

  protected _whenDepositWasDone(event: DepositWasDone) {
    this.#transactions.push(event.transaction);
    this.#balance = this.#balance.add(event.transaction.amount);
  }

  protected _whenWithdrawWasDone(event: WithdrawWasDone) {
    this.#transactions.push(event.transaction);
    this.#balance = this.#balance.sub(event.transaction.amount);
  }

  protected _whenAccountWasOpened(event: AccountWasOpened) {
    this.#accountId = event.accountId;
    this.#iban = event.iban;
    this.#bic = event.bic;
    this.#ownerId = event.ownerId;
    this.#opened = event.createdAt.toDate();
    this.#balance = Money.euro(0);
    this.#lineOfCredit = Money.euro(0);
    this.#transactions = [];
  }

  static registeredEvents(): IEventConstructor[] {
    return [
      AccountWasOpened,
      DepositWasDone,
      WithdrawWasDone,
      MoneyWasTransfered,
      LineOfCreditWasChanged,
    ];
  }
}
