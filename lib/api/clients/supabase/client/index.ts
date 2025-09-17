import { ClientTransactionRepo } from "./ClientTransactionRepo"

export const clientRepositories = {
    transactions: new ClientTransactionRepo(),
}