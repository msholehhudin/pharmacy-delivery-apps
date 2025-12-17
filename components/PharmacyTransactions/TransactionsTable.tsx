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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  changeText,
  formatCurrency,
  formatDateTime,
  getStatusColor,
} from "@/utils/helper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  getPaymentIcon,
  getTransactionTypeIcon,
} from "@/lib/utils/tableIcons/getIcon";
import { useAuth } from "@/context/AuthProvider";

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading: boolean;
  isFetching: boolean;
  onEdit: (transaction: Transaction) => void;
}

const TransactionsTable = ({
  transactions,
  isLoading,
  isFetching,
  onEdit,
}: TransactionTableProps) => {
  const { user } = useAuth();
  const userRole = user?.role;

  // console.log("ini user role di transaction table : ", userRole);
  // console.log("TransactionList on table : ", transactions);
  // console.log("TransactionList on isLoading : ", isLoading);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          A complete list of all pharmacy transactions and medicine sales.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading || isFetching ? (
          <div className="flex items-center justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-4">Loading Pharmacy Transactions...</span>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead>Transaction</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Medicines</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Courier</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {transaction.prescriptionCode}
                      </div>
                      {/* <div className="text-sm text-gray-500">test</div> */}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {transaction.patientName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {transaction.patientAddress}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {formatCurrency(transaction.amount)}
                    </div>
                    <div className="text-sm text-gray-500">Fee : Rp. 1000</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTransactionTypeIcon(transaction.type)}
                      <span className="capitalize">{transaction.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.prescriptionDetails}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(transaction.status)}>
                      <span className="capitalize">
                        {changeText(transaction.status)}
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getPaymentIcon(transaction.paymentMethod)}
                      <span className="capitalize">
                        {transaction.paymentMethod}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="capitalize">
                      {transaction.courierName}
                    </span>
                  </TableCell>
                  <TableCell>
                    {formatDateTime(transaction.transactionDate)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className="h-8 w-8 p-0 hover:cursor-pointer"
                        >
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {userRole && userRole === "courier" ? (
                          <>
                            <DropdownMenuItem className="hover:cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" />
                              Update Status
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <>
                            <DropdownMenuItem
                              onClick={() => onEdit(transaction)}
                              className="hover:cursor-pointer"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 hover:cursor-pointer">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionsTable;
