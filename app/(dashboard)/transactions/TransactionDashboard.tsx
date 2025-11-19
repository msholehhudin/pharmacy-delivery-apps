"use client";

import PaginationControls from "@/components/PaginationControls";
import PharmacyFilters from "@/components/PharmacyTransactions/PharmacyFilters";
import PharmacyHeader from "@/components/PharmacyTransactions/PharmacyHeader";
import PharmacyStats from "@/components/PharmacyTransactions/PharmacyStats";
import TransactionDialogs from "@/components/PharmacyTransactions/TransactionDialogs";
import TransactionsTable from "@/components/PharmacyTransactions/TransactionsTable";
import { useAuth } from "@/context/AuthProvider";
import useTransactionDialogs from "@/hooks/Transactions/useTransactionDialogs";
import useTransactionFilters from "@/hooks/Transactions/useTransactionFilters";
// import useTransactionRealtime from "@/hooks/Transactions/useTransactionRealtime";
import useTransactions from "@/hooks/Transactions/useTransactions";
import { Transaction } from "@/types/transactions";

const TransactionDashboard = () => {
  const filters = useTransactionFilters();
  const {
    data: transactions,
    isLoading,
    isError,
    error,
    isFetching,
  } = useTransactions(filters);

  console.log("data pagination : ", filters);
  console.log("data transaction : ", isFetching);

  const { user } = useAuth();
  const { dialogStates, openDialog, closeDialog, selectedTransaction } =
    useTransactionDialogs();
  // useTransactionRealtime();

  // console.log("List Transactions : ", filteredTransaction);
  const openEditDialog = (transactions: Transaction) => {
    openDialog("edit", transactions);
    console.log("edit data modal : ", transactions);
  };
  return (
    <div className="min-h-screen">
      <div className="px-8 py-6">
        <PharmacyHeader />

        {user?.role !== "courier" && <PharmacyStats />}

        {user?.role !== "courier" && (
          <PharmacyFilters
            search={filters.search}
            onSearchChange={filters.setSearch}
            statusFilter={filters.statusFilter}
            onStatusChange={filters.setStatusFilter}
            onAddTransaction={() => openDialog("add")}
          />
        )}
        <TransactionsTable
          transactions={transactions?.data ?? []}
          isLoading={isLoading}
          isFetching={isFetching}
          onEdit={openEditDialog}
        />

        <PaginationControls
          page={filters.page}
          pageSize={filters.pageSize}
          total={transactions?.totalCount ?? 0}
          onPageChange={filters.setPage}
          onPageSizeChange={filters.setPageSize}
        />

        <TransactionDialogs
          dialogStates={dialogStates}
          onClose={closeDialog}
          selectedTransaction={selectedTransaction}
        />
      </div>
    </div>
  );
};

export default TransactionDashboard;
