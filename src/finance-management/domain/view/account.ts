import { Money } from '../money';

export interface Account {
    id: string;
    bic: string;
    iban: string;
    balance: Money;
    lineOfCredit: Money;
    ownerId?: string;
}

const euroFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

export const formatMoney = (amount: number) => euroFormatter.format(amount / 100);