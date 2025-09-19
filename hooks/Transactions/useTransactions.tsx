"use client";

import { transactionClientService } from "@/lib/services/transactions/transactionClientServices";
import { Pagination } from "@/types/pagination";
import { Transaction } from "@/types/transactions";
import { useQuery } from "@tanstack/react-query";

const useTransactions = (pagination: Pagination) => {
  return useQuery({
    queryKey: ["transactions", pagination],
    queryFn: () => transactionClientService.getTransactions(pagination),
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });
};

export default useTransactions;
