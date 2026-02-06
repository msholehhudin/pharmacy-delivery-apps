import { transactionApiService } from "@/lib/services/transactions/transactionApiService";
import { transactionServerService } from "@/lib/services/transactions/transactionsServerService";
import { TransactionFormValues } from "@/types/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TransactionFormValues) =>
      transactionApiService.createTransaction(payload),
    onSuccess: (data) => {
      console.log("Mutation successfull, invalidating queries...");
      console.log("Data returned : ", data);
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
        exact: false,
      });

      const queries = queryClient
        .getQueryCache()
        .findAll({ queryKey: ["transactions"] });
      console.log("🔍 Found transactions queries:", queries.length);
    },
  });
};
