"use client";

import FullScreenLoader from "@/components/ui/FullScreenLoader";
import { useAuth } from "@/context/AuthProvider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loadingLogout } = useAuth();
  console.log("ini set Loading useAuth : ", loadingLogout);
  return (
    <>
      {loadingLogout && <FullScreenLoader />}
      {children}
    </>
  );
}
