import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { SearchInput } from "./SearchInput";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex w-full h-screen flex-col">
        <header className="flex box-content border-b-1 h-16 shrink-0 items-center gap-2 sticky top-0 z-50 bg-white">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger />
            <SearchInput />
          </div>
        </header>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
