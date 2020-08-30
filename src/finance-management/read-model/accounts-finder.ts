import { AccountFinder } from '../domain/service/account-finder';
import { Pool } from 'pg';
import { Injectable } from '@nestjs/common';
import { AccountItem } from './accounts';
import { Account } from '../domain/view/account';
import { Money } from '../domain/money';

@Injectable()
export class AccountsReadModelFinder implements AccountFinder {
    constructor(private readonly client: Pool) {}

    async findAll(): Promise<Account[]> {
        const result = await this.client.query<AccountItem>(`SELECT id, iban, bic, balance, line_of_credit, owner_id FROM app_accounts ORDER BY iban ASC`);

        return result.rows.map<Account>(({ line_of_credit, balance, owner_id, ...rest }) => ({
            ...rest,
            lineOfCredit: Money.euro(line_of_credit / 100),
            balance: Money.euro(balance / 100),
            ownerId: owner_id
        }))
    }

    async findByOwnerId(ownerId: string): Promise<Account[]> {
        const result = await this.client.query<AccountItem>(`SELECT id, iban, bic, balance, line_of_credit FROM app_accounts WHERE owner_id = $1 ORDER BY iban ASC`, [ownerId]);

        return result.rows.map<Account>(({ line_of_credit, balance, ...rest }) => ({
            ...rest,
            lineOfCredit: Money.euro(line_of_credit / 100),
            balance: Money.euro(balance / 100),
        }))
    }

    async findById(accountId: string): Promise<Account> {
        const result = await this.client.query<AccountItem>(`SELECT id, iban, bic, balance, line_of_credit, owner_id FROM app_accounts WHERE id = $1`, [accountId]);

        if (result.rowCount === 0) throw Error(`Account with ID ${accountId} Not found`);

        return {
            ...result.rows[0],
            lineOfCredit: Money.euro(result.rows[0].line_of_credit / 100 / 100),
            balance: Money.euro(result.rows[0].balance / 100),
            ownerId: result.rows[0].owner_id
        }
    }
}