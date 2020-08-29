/* eslint-disable @typescript-eslint/no-var-requires */
const { Account } = require('./dist/finance-management/domain/account')

require('dotenv').config();

module.exports = {
  connectionString: process.env.POSTGRES_DB,
  aggregates: [Account],
}
