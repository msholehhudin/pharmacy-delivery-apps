"use client";

import { getClientTransactions } from "@/lib/api/transactions/client-queries";
import { createClient } from "@/lib/supabase/client";
import { Transaction } from "@/types/transactions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useTransactions = (initialData?: Transaction[]) => {
  const queryClient = useQueryClient();
  const supabase = createClient();

  useEffect(() => {
    const setupChannel = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const channel = supabase
        .channel("transactions-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "transactions",
          },
          () => {
            queryClient.invalidateQueries({
              queryKey: ["transactions"],
              exact: true,
            });
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };

    const cleanupPromise = setupChannel();
    return () => {
      cleanupPromise.then((cleanup) => cleanup?.());
    };
  }, [queryClient, supabase]);

  return useQuery({
    queryKey: ["transactions"],
    queryFn: getClientTransactions,
    initialData,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export default useTransactions;
