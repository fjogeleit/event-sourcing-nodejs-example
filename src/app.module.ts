import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventStoreModule } from './event-store';
import { Configuration } from 'fj-event-store';
import { FinanceManagementModule } from './finance-management/infrastructure/finance-management.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const options: Configuration = require('../event-store.config.js');

@Module({
  imports: [FinanceManagementModule, EventStoreModule.forRoot(options)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
