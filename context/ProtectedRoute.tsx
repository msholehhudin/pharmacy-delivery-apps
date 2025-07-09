"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { ReactNode, useEffect } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user]);

  if (loading || !user) return <div>Loading...</div>;

  return children;
}
