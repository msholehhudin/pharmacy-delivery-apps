import { getTransactions } from "@/lib/api/transactions/queries";
import TransactionView from "./TransactionView";

const TransactionPage = async () => {
  const initialData = await getTransactions();
  // console.log("here is a initial data : ", initialData);
  return <TransactionView initialData={initialData} />;
};

export default TransactionPage;
