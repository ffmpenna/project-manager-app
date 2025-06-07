import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Outlet } from 'react-router';
import { SearchInput } from './SearchInput';
import { Separator } from './ui/separator';

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex w-full h-screen flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger />
            <SearchInput />
          </div>
        </header>
        <Separator />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
