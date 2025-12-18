"use client";

import FullScreenLoader from "@/components/ui/FullScreenLoader";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) return;

    if (["courier", "pharmacy_staff"].includes(user.role)) {
      router.replace("/unauthorized");
    }
  }, [user, router]);

  if (!user) {
    return <FullScreenLoader />;
  }
  return <>{children}</>;
};

export default UserLayout;
