import { IEventStore } from 'fj-event-store';
import ibanExistsQuery from '../../query/iban-exists';
import { IbanExistsVaidator } from '../../domain/service/iban-exists-validator';
import { Injectable, Inject } from '@nestjs/common';
import { EVENT_STORE } from '../../../event-store/constants';

@Injectable()
export class IbanExistsQueryVaidator implements IbanExistsVaidator {
    constructor(@Inject(EVENT_STORE) private readonly eventStore: IEventStore) {};

    async validate(iban: string) {
        const ibanExists = await ibanExistsQuery(this.eventStore)(iban);

        if (ibanExists) throw Error(`IBAN ${iban} already exists`)
    }
}