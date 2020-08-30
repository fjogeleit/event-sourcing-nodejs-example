import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { EventMiddleWare } from 'fj-event-store';
import {
  createPostgresEventStore,
  PostgresConfiguration,
} from 'fj-event-store/postgres';
import { EVENT_STORE } from './constants';
import { CqrsModule } from '@nestjs/cqrs';
import { FINANCE_MANAGEMENT_STREAM } from 'src/finance-management/domain/account-collection';
import { Pool } from 'pg';
import { createPostgresClient } from 'fj-event-store/dist/helper/postgres';

@Global()
@Module({
  imports: [CqrsModule],
})
export class EventStoreCoreModule {
  static forRootAsync(
    options: PostgresConfiguration,
    middleWareProvider: Provider<Promise<EventMiddleWare[]>>,
  ): DynamicModule {
    const eventStoreProvider = {
      provide: EVENT_STORE,
      useFactory: async (middleware: EventMiddleWare[]) => {
        options.middleware = [...(options.middleware || []), ...middleware];

        const eventStore = createPostgresEventStore(options);
        await eventStore.install();

        try {
          await eventStore.createStream(FINANCE_MANAGEMENT_STREAM);
          // tslint:disable-next-line:no-empty
        } catch {}

        return eventStore;
      },
      inject: ['middleware'],
    };

    const poolProvider = {
      provide: Pool,
      useValue: createPostgresClient(process.env.POSTGRES_DB),
    }

    return {
      module: EventStoreCoreModule,
      providers: [middleWareProvider, eventStoreProvider, poolProvider],
      exports: [eventStoreProvider, poolProvider],
    };
  }
}
