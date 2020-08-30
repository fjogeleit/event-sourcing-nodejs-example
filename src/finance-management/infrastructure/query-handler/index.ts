import { FindAccountsByOwnerHandler } from '../query-handler/find-accounts-by-owner-handler';
import { FindAllAccountsHandler } from '../query-handler/find-all-accounts-handler';
import { FindAccountByIdHandler } from '../query-handler/find-account-by-id-handler';

export {
    FindAccountsByOwnerHandler,
    FindAllAccountsHandler,
    FindAccountByIdHandler,
};

export default [
    FindAccountsByOwnerHandler,
    FindAllAccountsHandler,
    FindAccountByIdHandler,
];