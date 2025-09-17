import { ServerTransactionRepo } from "./ServerTransactionRepo";

export const serverRepositories = {
    transactions: new ServerTransactionRepo(),
}