import {
  CircleSmall,
  Home,
  ListTodo,
  LoaderPinwheel,
  Settings,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Separator } from './ui/separator';

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Tasks',
    url: '/me/tasks',
    icon: ListTodo,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

const projects = [
  {
    title: 'Mobile App',
    url: '/projects/1',
    color: '#7d39a2',
  },
  {
    title: 'Website Redesign',
    url: '/projects/2',
    color: '#f59e0b',
  },
  {
    title: 'Design System',
    url: '/projects/3',
    color: '#10b981',
  },
  {
    title: 'Wireframes',
    url: '/projects/4',
    color: '#3b82f6',
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[slot=sidebar-menu-button]:!p-2 text-sidebar-accent-foreground"
            >
              <a href="#">
                <LoaderPinwheel strokeWidth={1.5} color="#7d39a2" />
                <span className="text-base font-semibold">Project M.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator className="!w-9/10 !self-center" />
        <SidebarGroup>
          <SidebarGroupLabel>
            <a href="/me/projects">MY PROJECTS</a>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((project) => (
                <SidebarMenuItem key={project.title}>
                  <SidebarMenuButton asChild>
                    <a href={project.url}>
                      <CircleSmall fill={project.color} color={project.color} />
                      <span>{project.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
