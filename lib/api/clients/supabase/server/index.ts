import { ServerTransactionRepo } from "./ServerTransactionRepo";
import { ServerUserRepo } from "./ServerUserRepo";

export const serverRepositories = {
    transactions: new ServerTransactionRepo(),
    courier: new ServerUserRepo()
}