"use client";

import { transactionClientService } from "@/lib/services/transactions/transactionClientServices";
import { Transaction } from "@/types/transactions";
import { useQuery } from "@tanstack/react-query";

const useTransactions = (initialData?: Transaction[]) => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactionClientService.getTransactions(),
    initialData,
    staleTime: 60 * 1000,
  });
};

export default useTransactions;
