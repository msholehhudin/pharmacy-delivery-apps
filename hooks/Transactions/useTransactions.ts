"use client";

import { useAuth } from "@/context/AuthProvider";
import { transactionClientService } from "@/lib/services/transactions/transactionClientServices";
import { Pagination } from "@/types/pagination";
import { TransactionQueryResult } from "@/types/transactions";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const useTransactions = (pagination: Pagination) => {
  const { user } = useAuth();
  // const { page, pageSize, search = '', status = '' } = pagination;
  
  // Stable query key with useMemo
  const queryKey = useMemo(() => [
    "transactions", 
    pagination.page, 
    pagination.pageSize, 
    pagination.search, 
    pagination.status, 
    user?.id,
    user?.role
  ], [pagination, user?.id, user?.role]);

  const isSearchValid = !pagination.search || pagination.search.length === 0 || pagination.search.length > 2;
  const isEnabled = !!user?.id && !!user?.role && isSearchValid;

  const query = useQuery<TransactionQueryResult>({
    queryKey,
    queryFn: async () => {
      if (!user?.id || !user?.role) {
        throw new Error("User not authenticated");
      }
      
      console.log("🔄 Actually calling API...");
      const response = await fetch("/api/transactions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pagination,
          user: {id: user.id, role: user.role} 
        })
      })

      console.log("🔍 Hook: API response status:", response.status);
      
      if(!response.ok){
        const errorData = await response.json()
        throw new Error(errorData.error || "API Request failed")
      }

       const result = await response.json();
        console.log("✅ Hook: API response data:", {
          dataLength: result.data?.length,
          totalCount: result.totalCount,
          sample: result.data?.slice(0, 2)
        });

        return result;

    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: isEnabled,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  });

  console.log("Query status:", {
    isFetching: query.isFetching,
    isPending: query.isPending,
    status: query.status,
    fetchStatus: query.fetchStatus,
    dataUpdatedAt: query.dataUpdatedAt,
  });

  return query;
};

export default useTransactions;