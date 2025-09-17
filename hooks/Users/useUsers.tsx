"use client";

import { createUser, getUsers } from "@/lib/services/users/usersService";
import { User } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Failed to create user: ", error);
    },
  });
};
