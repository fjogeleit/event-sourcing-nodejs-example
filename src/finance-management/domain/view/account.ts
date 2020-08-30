export interface Account {
    id: string;
    bic: string;
    iban: string;
    balance: number;
    lineOfCredit: number;
    ownerId?: string;
}

const euroFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

export const formatMoney = (amount: number) => euroFormatter.format(amount / 100);