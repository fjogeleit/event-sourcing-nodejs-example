export class OpenAccount {
  constructor(
    public readonly accountId: string,
    public readonly iban: string,
    public readonly bic: string,
    public readonly ownerId: string,
  ) {}
}
