"use client";

import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type AuthRedirectProps = {
  role?: "courier" | "pharmacy_admin" | "pharmacy_super_admin";
  children: React.ReactNode;
};
const AuthRedirect = ({ role, children }: AuthRedirectProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(
        "/login?redirect=" + encodeURIComponent(window.location.pathname)
      );
    }
    if (!loading && user && role && user.role !== role) {
      router.push("/unauthorized"); // Create this page soon
    }
  }, [user, loading, router]);

  if (loading || !user) return <div>Loading...</div>;
  if (role && user.role !== role) return <div>Checking permission...</div>;
  return <>{children}</>;
};

export default AuthRedirect;
