"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
// import type { DateRange } from "react-day-picker";

interface Medicines {
  id: string;
  name: string;
  dosage: string;
  quantity: number;
  price: number;
  instructions?: string;
}

interface MedicineFormData {
  name: string;
  dosage: string;
  quantity: string;
  price: string;
  instructions: string;
}

interface Transaction {
  id: string;
  customerName: string;
  patientAddress: string;
  amount: number;
  type: "payment" | "refund" | "chargeback";
  status: "completed" | "pending" | "failed" | "cancelled";
  method: "credit_card" | "debit_card" | "bank_transfer" | "cash";
  date: string;
  medicines: Medicines[];
  notes: string;
  fee: number;
  prescriptionId?: string;
}

const initialTransactions: Transaction[] = [
  {
    id: "TXN-001",
    customerName: "Bojes o uno",
    patientAddress: "Jalan By Pass, Pandaan",
    amount: 129000,
    type: "payment",
    status: "completed",
    method: "credit_card",
    date: "2024-01-15T10:30:00Z",
    medicines: [
      {
        id: "MED-001",
        name: "Panadol",
        dosage: "500mg",
        quantity: 20,
        price: 45000,
        instructions: "Take 1 tablet every 6 hours",
      },
      {
        id: "MED-002",
        name: "Amoxicillin",
        dosage: "250mg",
        quantity: 15,
        price: 75000,
        instructions: "Take 1 capsule 3 times daily",
      },
      {
        id: "MED-003",
        name: "Vitamin C",
        dosage: "1000mg",
        quantity: 30,
        price: 9000,
        instructions: "Take 1 tablet daily",
      },
    ],
    notes: "Prescription from Dr. Smith",
    fee: 12900,
    prescriptionId: "PX-2024-001",
  },
  {
    id: "TXN-002",
    customerName: "Onde Mande",
    patientAddress: "Taman Dayu no. 4",
    amount: 149000,
    type: "payment",
    status: "pending",
    method: "bank_transfer",
    date: "2024-01-14T15:45:00Z",
    medicines: [
      {
        id: "MED-004",
        name: "Omeprazole",
        dosage: "20mg",
        quantity: 14,
        price: 89000,
        instructions: "Take 1 capsule before breakfast",
      },
      {
        id: "MED-005",
        name: "Metformin",
        dosage: "500mg",
        quantity: 60,
        price: 60000,
        instructions: "Take 1 tablet twice daily with meals",
      },
    ],
    notes: "Diabetes medication refill",
    fee: 14900,
    prescriptionId: "PX-2024-002",
  },
  {
    id: "TXN-003",
    customerName: "Mike Sinoda",
    patientAddress: "Taman Dayu No. 1",
    amount: 89999,
    type: "refund",
    status: "completed",
    method: "credit_card",
    date: "2024-01-13T09:15:00Z",
    medicines: [
      {
        id: "MED-006",
        name: "Ibuprofen",
        dosage: "400mg",
        quantity: 20,
        price: 89999,
        instructions: "Take 1 tablet every 8 hours",
      },
    ],
    notes: "Customer returned unused medication",
    fee: 8900,
    prescriptionId: "PX-2024-003",
  },
  {
    id: "TXN-004",
    customerName: "Emily Armstrong",
    patientAddress: "Gempol, Pandaan",
    amount: 59900,
    type: "payment",
    status: "failed",
    method: "debit_card",
    date: "2024-01-12T14:20:00Z",
    medicines: [
      {
        id: "MED-007",
        name: "Cetirizine",
        dosage: "10mg",
        quantity: 10,
        price: 25000,
        instructions: "Take 1 tablet daily for allergies",
      },
      {
        id: "MED-008",
        name: "Loratadine",
        dosage: "10mg",
        quantity: 14,
        price: 34900,
        instructions: "Take 1 tablet daily",
      },
    ],
    notes: "Allergy medication",
    fee: 5900,
    prescriptionId: "PX-2024-004",
  },
  {
    id: "TXN-005",
    customerName: "Alexandre Ichal",
    patientAddress: "Gempol, Pandaan",
    amount: 61000,
    type: "payment",
    status: "completed",
    method: "cash",
    date: "2024-01-11T11:00:00Z",
    medicines: [
      {
        id: "MED-009",
        name: "Aspirin",
        dosage: "100mg",
        quantity: 30,
        price: 15000,
        instructions: "Take 1 tablet daily after meal",
      },
      {
        id: "MED-010",
        name: "Simvastatin",
        dosage: "20mg",
        quantity: 30,
        price: 46000,
        instructions: "Take 1 tablet at bedtime",
      },
    ],
    notes: "Heart medication",
    fee: 6100,
    prescriptionId: "PX-2024-005",
  },
];

export default function TransactionDemo() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  //   const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [formData, setFormData] = useState({
    customerName: "",
    patientAddress: "",
    amount: "",
    type: "payment" as "payment" | "refund" | "chargeback",
    status: "pending" as "completed" | "pending" | "failed" | "cancelled",
    method: "credit_card" as
      | "credit_card"
      | "debit_card"
      | "bank_transfer"
      | "cash",
    notes: "",
  });

  //   Medicine Form
  const [medicineList, setMedicineList] = useState<MedicineFormData[]>([
    {
      name: "",
      dosage: "",
      quantity: "",
      price: "",
      instructions: "",
    },
  ]);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.customerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.patientAddress
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.medicines.some((med) =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate statistics
  const totalRevenue = transactions
    .filter((t) => t.type === "payment" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRefunds = transactions
    .filter((t) => t.type === "refund" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = transactions
    .filter((t) => t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalFees = transactions.reduce((sum, t) => sum + t.fee, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <ArrowUpRight className="h-4 w-4 text-green-600" />;
      case "refund":
        return <ArrowDownRight className="h-4 w-4 text-red-600" />;
      case "chargeback":
        return <RefreshCw className="h-4 w-4 text-orange-600" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "credit_card":
      case "debit_card":
        return <CreditCard className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const handleAddTransaction = () => {
    // const medicines: Medicine[] = medicineList.filter
    const newTransaction: Transaction = {
      id: `TXN-${String(transactions.length + 1).padStart(3, "0")}`,
      customerName: formData.customerName,
      patientAddress: formData.patientAddress,
      amount: Number.parseFloat(formData.amount),
      type: formData.type,
      status: formData.status,
      method: formData.method,
      date: new Date().toISOString(),
      //   medicines: formData.medicines,
      notes: formData.notes || `REF-${Date.now()}`,
      fee: Number.parseFloat(formData.amount) * 0.03, // 3% fee
    };
    setTransactions([newTransaction, ...transactions]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditTransaction = () => {
    if (!selectedTransaction) return;

    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === selectedTransaction.id
        ? {
            ...transaction,
            customerName: formData.customerName,
            patientAddress: formData.patientAddress,
            amount: Number.parseFloat(formData.amount),
            type: formData.type,
            status: formData.status,
            method: formData.method,
            medicines: formData.medicines,
            notes: formData.notes,
          }
        : transaction
    );
    setTransactions(updatedTransactions);
    setIsEditDialogOpen(false);
    resetForm();
    setSelectedTransaction(null);
  };

  const handleDeleteTransaction = () => {
    if (!selectedTransaction) return;

    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== selectedTransaction.id
    );
    setTransactions(updatedTransactions);
    setIsDeleteDialogOpen(false);
    setSelectedTransaction(null);
  };

  const openEditDialog = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setFormData({
      customerName: transaction.customerName,
      patientAddress: transaction.patientAddress,
      amount: transaction.amount.toString(),
      type: transaction.type,
      status: transaction.status,
      method: transaction.method,
      medicines: transaction.medicines,
      notes: transaction.notes,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      customerName: "",
      patientAddress: "",
      amount: "",
      type: "payment",
      status: "pending",
      method: "credit_card",
      medicines: "",
      notes: "",
    });
  };

  const clearFilters = () => {
    setStatusFilter("all");
    setTypeFilter("all");
    // setDateRange(undefined);
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen ">
      {/* Main Content */}
      {/* <div > */}
      <div className="px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold dark:text-white text-gray-900">
            Transaction Management
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mt-2">
            Monitor and manage all financial transactions
          </p>
        </div>

        {/* Financial Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(totalRevenue)}
              </div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Medicines Sold
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(totalRefunds)}
              </div>
              <p className="text-xs text-muted-foreground">Units this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Prescriptions
              </CardTitle>
              <Calendar className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {formatCurrency(pendingAmount)}
              </div>
              <p className="text-xs text-muted-foreground">
                {transactions.filter((t) => t.status === "pending").length}{" "}
                Active Prescriptions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Orders
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(totalFees)}
              </div>
              <p className="text-xs text-muted-foreground">
                Awaiting Processing
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Filters Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
                <SelectItem value="chargeback">Chargeback</SelectItem>
              </SelectContent>
            </Select>

            {(statusFilter !== "all" || typeFilter !== "all" || searchTerm) && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Transaction
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Transaction</DialogTitle>
                  <DialogDescription>
                    Create a new transaction record.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Patient Name</Label>
                      <Input
                        id="customerName"
                        value={formData.customerName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            customerName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patientAddress">Patient Address</Label>
                      <Input
                        id="patientAddress"
                        type="email"
                        value={formData.patientAddress}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            patientAddress: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        value={formData.amount}
                        onChange={(e) =>
                          setFormData({ ...formData, amount: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="method">Payment Method</Label>
                      <Select
                        value={formData.method}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, method: value })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit_card">
                            Credit Card
                          </SelectItem>
                          <SelectItem value="debit_card">Debit Card</SelectItem>
                          <SelectItem value="bank_transfer">
                            Bank Transfer
                          </SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, status: value })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, type: value })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="payment">Payment</SelectItem>
                          <SelectItem value="refund">Refund</SelectItem>
                          <SelectItem value="chargeback">Chargeback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Medicines</Label>
                    {/* <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    /> */}
                    <Textarea
                      value={formData.medicines}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          medicines: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reference">Notes</Label>
                    {/* <Input
                      id="reference"
                      value={formData.reference}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          reference: e.target.value,
                        })
                      }
                    /> */}
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddTransaction}>
                    Add Transaction
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              A complete list of all financial transactions in your system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.id}</div>
                        <div className="text-sm text-gray-500">
                          {transaction.notes}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {transaction.customerName}
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
                      {transaction.fee > 0 && (
                        <div className="text-sm text-gray-500">
                          Fee: {formatCurrency(transaction.fee)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(transaction.type)}
                        <span className="capitalize">{transaction.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {transaction.medicines}
                      <span></span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getMethodIcon(transaction.method)}
                        <span className="capitalize">
                          {transaction.method.replace("_", " ")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatDate(transaction.date)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => openEditDialog(transaction)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Receipt
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openDeleteDialog(transaction)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {/* </div> */}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
            <DialogDescription>
              Make changes to the transaction. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-customerName">Customer Name</Label>
                <Input
                  id="edit-customerName"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-patientAddress">Customer Email</Label>
                <Input
                  id="edit-patientAddress"
                  type="email"
                  value={formData.patientAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, patientAddress: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-amount">Amount</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={formData.medicines}
                onChange={(e) =>
                  setFormData({ ...formData, medicines: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEditTransaction}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Transaction</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete transaction{" "}
              {selectedTransaction?.id}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTransaction}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
