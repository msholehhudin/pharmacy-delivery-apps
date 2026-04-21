import { ClientNotificationRepo } from "./ClientNotificationRepo"
import { ClientTransactionRepo } from "./ClientTransactionRepo"
import { ClientUserRepo } from "./ClientUserRepo"

export const clientRepositories = {
    transactions: new ClientTransactionRepo(),
    couriers: new ClientUserRepo(),
    notifications: new ClientNotificationRepo()
}