import { IEventStore, MetadataOperator, FieldType } from 'fj-event-store'

import { FINANCE_MANAGEMENT_STREAM } from '../../finance-management/domain/account-collection';
import { AccountWasOpened } from '../domain/event/account-was-opened';

export default (eventStore: IEventStore) => async (iban: string): Promise<boolean> => {
    const query = eventStore
        .getProjectionManager()
        .createQuery<boolean>();

    await query
        .fromStream({ 
            streamName: FINANCE_MANAGEMENT_STREAM, 
            matcher: { 
                data: [{ field: 'event_name', value: AccountWasOpened.name, operation: MetadataOperator.EQUALS, fieldType: FieldType.MESSAGE_PROPERTY }]
            }})
        .init(() => false)
        .whenAny((state, event: AccountWasOpened) => {
            if (event.iban === iban) {
                query.stop();

                return true;
            }

            return state;
        })
        .run();

    return query.getState();
}