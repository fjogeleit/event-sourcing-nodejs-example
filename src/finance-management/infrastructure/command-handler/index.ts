import { OpenAccountHandler } from './open-account-handler';
import { PerformDepositHandler } from './perform-deposit-handler';
import { PerformWithdrawHandler } from './perform-withdraw-handler';
import { PerformTransferHandler } from './perform-transfer-handler';
import { ChangeLineOfCreditHandler } from './change-line-of-credit-handler';

export {
  OpenAccountHandler,
  PerformDepositHandler,
  PerformWithdrawHandler,
  PerformTransferHandler,
  ChangeLineOfCreditHandler,
};

export default [
  OpenAccountHandler,
  PerformDepositHandler,
  PerformWithdrawHandler,
  PerformTransferHandler,
  ChangeLineOfCreditHandler,
];
