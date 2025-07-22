import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import ProtectedRoute from "@/context/ProtectedRoute";

export default function DashboardLayout({ children }: any) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Toaster />
      <main className="w-full p-4">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
