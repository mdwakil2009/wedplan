import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b border-[#F0E7E8] bg-white/95 px-4 backdrop-blur sm:px-6">
          <SidebarTrigger className="text-[#772D43] hover:bg-[#F8EFF0] hover:text-[#772D43]" />
          <div className="h-4 w-px bg-[#EDE2E5]" />
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#91858C]">
            WEDPLAN DASHBOARD
          </p>
        </header>

        <div className="flex-1 bg-[#FFFCF9]">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
