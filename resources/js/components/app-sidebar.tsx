import { Link, usePage } from '@inertiajs/react';
import { FileText, Headphones, LayoutGrid, Plus } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Button } from '@/components/ui/button';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, requestQuote } from '@/routes';
import type { NavItem } from '@/types';

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Orders',
        href: '/admin/orders',
        icon: FileText,
    },
];

const customerNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Support',
        href: '/contact-us',
        icon: Headphones,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props as {
        auth: {
            user: { id: number; name: string; email: string } | null;
            is_admin: boolean;
        };
    };
    const isAdmin = auth.is_admin;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={isAdmin ? adminNavItems : customerNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {!isAdmin && (
                    <div className="px-3 pb-2">
                        <Link href={requestQuote().url}>
                            <Button className="w-full gap-2 bg-[#06b6d4] text-white hover:bg-[#0891b2]">
                                <Plus className="size-4" />
                                New Request
                            </Button>
                        </Link>
                    </div>
                )}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
