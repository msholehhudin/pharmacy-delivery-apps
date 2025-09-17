import { transactionService } from "@/lib/services/transactions/transactionClientServices";
import TransactionDemo from "./TransactionDemo";
import TransactionView from "./TransactionView";
import { getServerTransactions } from "@/lib/api/transactions/server-queries";

const TransactionPage = async () => {
  // const initialData = await getServerTransactions();
  // const transactions = await transactionService.getTransaction();
  // console.log("here is a initial data : ", transactions);
  // return <TransactionView initialData={initialData} />;
  return <TransactionDemo />;
};

export default TransactionPage;
