export class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: string,
  ) {}

  static euro(amount: number): Money {
    return new this(amount, 'EURO');
  }

  public add(money: Money): Money {
    if (money.currency != this.currency) {
      throw Error(
        `Could not add Money with Currency ${money.currency} to Currency ${this.currency}`,
      );
    }

    return new Money(this.amount + money.amount, this.currency);
  }

  public sub(money: Money): Money {
    if (money.currency != this.currency) {
      throw Error(
        `Could not sub Money with Currency ${money.currency} to Currency ${this.currency}`,
      );
    }

    return new Money(this.amount - money.amount, this.currency);
  }

  public greatherThan(money: Money): boolean {
    if (money.currency != this.currency) {
      throw Error(
        `Could not compare Money with Currency ${money.currency} to Currency ${this.currency}`,
      );
    }

    return this.amount > money.amount;
  }
}
