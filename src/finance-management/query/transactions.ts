import { IEventStore, MetadataOperator, FieldType } from 'fj-event-store'
import { FINANCE_MANAGEMENT_STREAM } from '../domain/account-collection';
import { DepositWasDone, WithdrawWasDone } from '../domain/event';
import { Transaction } from '../domain/transaction';

export default (eventStore: IEventStore) => async (accountId: string): Promise<Transaction[]> => {
    const query = eventStore
        .getProjectionManager()
        .createQuery<Transaction[]>();

    await query
        .fromStream({ 
            streamName: FINANCE_MANAGEMENT_STREAM, 
            matcher: { 
                data: [
                    { field: 'event_name', value: [DepositWasDone.name, WithdrawWasDone.name], operation: MetadataOperator.IN, fieldType: FieldType.MESSAGE_PROPERTY },
                    { field: '_aggregate_id', value: accountId, operation: MetadataOperator.EQUALS, fieldType: FieldType.METADATA },
                ]
            }})
        .init(() => [])
        .whenAny((state, event: DepositWasDone | WithdrawWasDone) => {
            state.push(event.transaction)

            return state;
        })
        .run();

    return query.getState();
}