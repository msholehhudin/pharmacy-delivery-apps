"use client";

import FullScreenLoader from "@/components/ui/FullScreenLoader";
import { useAuth } from "@/context/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          await supabase.rpc("update_last_sign_in_for_user");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const { loadingLogout } = useAuth();
  console.log("ini set Loading useAuth : ", loadingLogout);
  return (
    <>
      {loadingLogout && <FullScreenLoader />}
      {children}
    </>
  );
}
