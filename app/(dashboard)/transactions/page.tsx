import TransactionDemo from "./TransactionDemo";
import TransactionView from "./TransactionView";
import { getServerTransactions } from "@/lib/api/transactions/server-queries";

const TransactionPage = async () => {
  const initialData = await getServerTransactions();
  // console.log("here is a initial data : ", initialData);
  // return <TransactionView initialData={initialData} />;
  return <TransactionDemo />;
};

export default TransactionPage;
