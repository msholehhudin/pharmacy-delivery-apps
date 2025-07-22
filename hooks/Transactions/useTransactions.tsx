"use client";

import { getClientTransactions } from "@/lib/api/transactions/client-queries";
import { Transaction } from "@/types/transactions";
import { useQuery } from "@tanstack/react-query";

const useTransactions = (initialData?: Transaction[]) => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getClientTransactions,
    initialData,
    staleTime: 60 * 100,
  });
};

export default useTransactions;
