



import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import  AppSidebar  from "./page"; 
import "@/app/globals.css"; 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-h-screen bg-[#F7F7F7] p-2">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}