import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ProtectedRoute from "@/context/ProtectedRoute";

export default function DashboardLayout({ children }: any) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-4">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
