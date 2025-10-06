"use client";

import PaginationControls from "@/components/PaginationControls";
import PharmacyFilters from "@/components/PharmacyTransactions/PharmacyFilters";
import PharmacyHeader from "@/components/PharmacyTransactions/PharmacyHeader";
import PharmacyStats from "@/components/PharmacyTransactions/PharmacyStats";
import TransactionsTable from "@/components/PharmacyTransactions/TransactionsTable";
import useTransactionFilters from "@/hooks/Transactions/useTransactionFilters";
import useTransactions from "@/hooks/Transactions/useTransactions";

const TransactionDashboard = () => {
  const filters = useTransactionFilters();
  const {
    data: transactions,
    isLoading,
    isError,
    error,
    isFetching,
  } = useTransactions(filters);

  const totalData = transactions?.length ?? 0;

  // console.log("List Transactions : ", filteredTransaction);
  return (
    <div className="min-h-screen">
      <div className="px-8 py-6">
        <PharmacyHeader />

        <PharmacyStats />

        <PharmacyFilters
          search={filters.search}
          onSearchChange={filters.setSearch}
          statusFilter={filters.statusFilter}
          onStatusChange={filters.setStatusFilter}
        />
        <TransactionsTable
          transactions={transactions ?? []}
          isLoading={isLoading}
        />

        <PaginationControls
          page={filters.page}
          pageSize={filters.pageSize}
          total={totalData}
          onPageChange={filters.setPage}
          onPageSizeChange={filters.setPageSize}
        />
      </div>
    </div>
  );
};

export default TransactionDashboard;
