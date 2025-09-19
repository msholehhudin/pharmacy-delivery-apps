import { Transaction } from "@/types/transactions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading: boolean;
}

const TransactionsTable = ({
  transactions,
  isLoading,
}: TransactionTableProps) => {
  console.log("TransactionList on table : ", transactions);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          A complete list of all pharmacy transactions and medicine sales.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-4">Loading Pharmacy Transactions...</span>
        </div>
        {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction</TableHead>
              <TableHead>Patient Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Medicines</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody></TableBody>
        </Table> */}
      </CardContent>
    </Card>
  );
};

export default TransactionsTable;
