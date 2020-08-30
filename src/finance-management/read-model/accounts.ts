import { AbstractReadModelProjection, AbstractReadModel } from 'fj-event-store';
import { PostgresClient } from 'fj-event-store/dist/helper/postgres';
import { AccountWasOpened, LineOfCreditWasChanged, DepositWasDone, WithdrawWasDone } from '../domain/event';
import { FINANCE_MANAGEMENT_STREAM } from 'src/finance-management/domain/account-collection';

export const ACCOUNT_TABLE = 'app_accounts';

export interface AccountItem {
  id: string;
  iban: string;
  bic: string;
  balance: number;
  line_of_credit: number;
  owner_id: string;
  last_change: Date
} 

class AccountsReadModel extends AbstractReadModel {
  constructor(private readonly client: PostgresClient) {
    super();
  }

  async init() {
    await this.client.connection.query(`
        CREATE TABLE ${ACCOUNT_TABLE} (
            id UUID NOT NULL,
            iban VARCHAR(255) NOT NULL,
            bic VARCHAR(255) NOT NULL,
            balance int DEFAULT 0,
            line_of_credit int DEFAULT 0,
            owner_id UUID NOT NULL,
            last_change TIMESTAMP WITHOUT TIME ZONE NOT NULL,
            PRIMARY KEY (id)
        );
    `);
  }

  async isInitialized() {
    return await this.client.exists(ACCOUNT_TABLE);
  }

  async reset() {
    await this.client.reset(ACCOUNT_TABLE);
  }

  async delete() {
    await this.client.delete(ACCOUNT_TABLE);
  }

  async insert(values) {
    await this.client.insert(ACCOUNT_TABLE, values);
  }

  async update(values, identifiers) {
    await this.client.update(ACCOUNT_TABLE, values, identifiers);
  }

  async remove(identifiers) {
    await this.client.remove(ACCOUNT_TABLE, identifiers);
  }
}

class AccountsReadModelProjection extends AbstractReadModelProjection<AccountsReadModel, { [account: string]: number }> {
    static projectionName = 'accounts';
  
    project() {
      return this.projector
        .fromStream({ streamName: FINANCE_MANAGEMENT_STREAM })
        .init(() => ({}))
        .when({
          [AccountWasOpened.name]: (state, event: AccountWasOpened) => {
            state[event.accountId] = 0;

            this.readModel.stack('insert', { 
                id: event.accountId, 
                iban: event.iban, 
                bic: event.bic, 
                owner_id: event.ownerId, 
                last_change: event.createdAt.toDate()
            });
  
            return state;
          },
          [LineOfCreditWasChanged.name]: (state, event: LineOfCreditWasChanged) => {
            this.readModel.stack('update', { 
                line_of_credit: event.lineOfCredit.toInt(), 
                last_change: event.createdAt.toDate() 
            }, { id: event.accountId });
  
            return state;
          },
          [DepositWasDone.name]: (state, event: DepositWasDone) => {
            state[event.accountId] += event.transaction.amount.toInt();

            this.readModel.stack('update', { 
                balance: state[event.accountId], 
                last_change: event.createdAt.toDate() 
            }, { id: event.accountId });
  
            return state;
          },
          [WithdrawWasDone.name]: (state, event: WithdrawWasDone) => {
            state[event.accountId] -= event.transaction.amount.toInt();

            this.readModel.stack('update', { 
                balance: state[event.accountId], 
                last_change: event.createdAt.toDate() 
            }, { id: event.accountId });
  
            return state;
          }
        });
    }
  }
  
  module.exports = {
    AccountsReadModelProjection,
    AccountsReadModel
  }