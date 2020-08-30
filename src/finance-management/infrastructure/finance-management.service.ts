import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transaction } from '../domain/transaction';
import { Account } from '../domain/view/account';
import { Money } from '../domain/money';
import {
  AccountCollection
} from 'src/finance-management/domain/account-collection';
import {
  IOpenAccount,
  IPerformDeposit,
  IPerformWithdraw,
  IPerformTransfer,
  IChangeLineOfCredit,
} from './command-payload';
import { 
  OpenAccount,
  PerformDeposit, 
  PerformWithdraw, 
  PerformTransfer, 
  ChangeLineOfCredit 
} from '../domain/command';
import { 
  FindAllAccounts, 
  FindAccountsByOwner,
  FindAccountById,
  FindTransactionsByAccount
} from '../domain/query';

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

  findAllAccounts(): Promise<Account[]> {
    return this.queryBus.execute(new FindAllAccounts())
  }

  findAccountsByOwner(ownerId: string): Promise<Account[]> {
    return this.queryBus.execute(new FindAccountsByOwner(ownerId))
  }

  findAccountById(accountId: string): Promise<Account> {
    return this.queryBus.execute(new FindAccountById(accountId))
  }

  findTransactionsByAccountId(accountId: string): Promise<Transaction[]> {
    return this.queryBus.execute(new FindTransactionsByAccount(accountId))
  }
}
