export interface IbanExistsVaidator {
    validate(iban: string): Promise<void>
}