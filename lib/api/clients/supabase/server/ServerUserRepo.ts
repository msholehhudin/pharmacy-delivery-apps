// lib/repositories/server/ServerUserRepo.ts

import { createServer } from "@/lib/supabase/server";


export class ServerUserRepo {
    async getCouriers() {
        const supabase = await createServer()
        
        try {
            console.log("🔍 Server User Repo: Getting couriers...");

            // Verify session
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            console.log("🔍 Server User Repo: Session status:", session ? "✅ Valid" : "❌ Null");
            
            if (sessionError) throw sessionError;
            if (!session) throw new Error("No authentication session");

            const { data, error } = await supabase
                .from("users")
                .select("id, name")
                .eq("role", "courier")
                .eq("status", "active")
                .order("name", { ascending: true });

            if (error) throw error;

            console.log("✅ Server User Repo: Found couriers:", data?.length || 0);
            return data || [];
            
        } catch (error) {
            console.error("❌ Server User Repo Error:", error);
            throw error;
        }
    }
}