import { Account } from '../view/account';

export interface AccountFinder {
    findAll(): Promise<Account[]>;
    findByOwnerId(ownerId: string): Promise<Account[]>;
    findById(ownerId: string): Promise<Account>;
}