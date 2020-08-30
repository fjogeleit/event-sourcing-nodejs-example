/* eslint-disable @typescript-eslint/no-var-requires */
const { Account } = require('./dist/finance-management/domain/account')
const { AccountsReadModelProjection, AccountsReadModel } = require('./dist/finance-management/read-model/accounts')

require('dotenv').config();

module.exports = {
  driver: 'postgres',
  connectionString: process.env.POSTGRES_DB,
  aggregates: [Account],
  readModelProjections: [
    { projection: AccountsReadModelProjection, readModel: AccountsReadModel }
  ]
}
