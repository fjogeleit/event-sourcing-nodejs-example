import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AccountCollection
} from 'src/finance-management/domain/account-collection';
import { OpenAccount } from '../domain/command/open-account';
import {
  IOpenAccount,
  IPerformDeposit,
  IPerformWithdraw,
  IPerformTransfer,
  IChangeLineOfCredit,
} from './command-payload';
import { PerformDeposit } from '../domain/command/perform-deposit';
import { Money } from '../domain/money';
import { PerformWithdraw } from '../domain/command/perform-withdraw';
import { PerformTransfer } from '../domain/command/perform-transfer';
import { ChangeLineOfCredit } from '../domain/command/change-line-of-credit';

@Injectable()
export class FinanceManagementService {
  public readonly repository: AccountCollection;

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  openAccount(payload: IOpenAccount) {
    return this.commandBus.execute(
      new OpenAccount(
        payload.accountId,
        payload.iban,
        payload.bic,
        payload.ownerId,
      ),
    );
  }

  changeLineOfCredit(payload: IChangeLineOfCredit) {
    return this.commandBus.execute(
      new ChangeLineOfCredit(
        payload.accountId,
        Money.euro(payload.lineOfCredit),
      ),
    );
  }

  performDeposit(payload: IPerformDeposit) {
    console.log(`perform ${payload}`)
    return this.commandBus.execute(
      new PerformDeposit(
        payload.accountId,
        Money.euro(payload.amount),
        payload.reference,
      ),
    );
  }

  performWithdraw(payload: IPerformWithdraw) {
    return this.commandBus.execute(
      new PerformWithdraw(
        payload.accountId,
        Money.euro(payload.amount),
        payload.reference,
      ),
    );
  }

  performTransfer(payload: IPerformTransfer) {
    return this.commandBus.execute(
      new PerformTransfer(
        payload.accountId,
        payload.targetAccount,
        Money.euro(payload.amount),
      ),
    );
  }
}
