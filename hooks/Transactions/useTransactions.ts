"use client";

import { useAuth } from "@/context/AuthProvider";
import { transactionClientService } from "@/lib/services/transactions/transactionClientServices";
import { Pagination } from "@/types/pagination";
import { Transaction, TransactionQueryResult } from "@/types/transactions";
import { useQuery } from "@tanstack/react-query";



const useTransactions = (pagination: Pagination) => {
  const {user} = useAuth()
  const {page, pageSize, search, status} = pagination

  console.log('Fetching transaction on hooks : ', pagination)
  return useQuery<TransactionQueryResult>({
    queryKey: ["transactions", page, pageSize, search, status, user?.id, user?.role],
    queryFn: () => transactionClientService.getTransactions(
      {page, pageSize, search, status}, 
      { id: user?.id ?? "", role: user?.role ?? ""}
  ),
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
    enabled: !!user
  });
};

export default useTransactions;
