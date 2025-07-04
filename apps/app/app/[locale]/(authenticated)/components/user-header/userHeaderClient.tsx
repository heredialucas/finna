'use client';

import { ReactNode, useState } from 'react';
import { LogoutButton } from '../logout-button';
import { Dictionary } from '@repo/internationalization';
import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import { useSidebar } from '@/store/sidebarStore';
import { Button } from '@repo/design-system/components/ui/button';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '@repo/design-system/lib/utils';

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
};

interface UserHeaderClientProps {
    logo?: ReactNode;
    title?: string;
    extraItems?: ReactNode;
    dictionary?: Dictionary;
    user?: User;
    locale?: string;
}

export function UserHeaderClient({ logo, title = 'Repartito', extraItems, dictionary, user, locale }: UserHeaderClientProps) {
    const { isCollapsed, toggleCollapse } = useSidebar();
    const [isLogoAreaHovered, setLogoAreaHovered] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 z-30 h-16">
            <div className="h-full mx-auto flex items-center justify-between px-4">
                <div
                    className="relative flex items-center gap-2 h-full"
                    onMouseEnter={() => setLogoAreaHovered(true)}
                    onMouseLeave={() => setLogoAreaHovered(false)}
                >
                    <div className={cn("transition-opacity", isCollapsed && isLogoAreaHovered && "opacity-0")}>
                        {logo}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "hidden md:flex transition-opacity duration-300",
                            isCollapsed ? "absolute top-1/2 left-0 -translate-y-1/2" : "",
                            isCollapsed && !isLogoAreaHovered ? "opacity-0 pointer-events-none" : "opacity-100"
                        )}
                        onClick={toggleCollapse}
                    >
                        {isCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
                    </Button>
                </div>
                <div className="flex items-center gap-3">
                    <ModeToggle />
                    {/* <LanguageSwitcher /> */}
                    {extraItems}
                    <LogoutButton userName={user?.name} dictionary={dictionary} locale={locale} />
                </div>
            </div>
        </header>
    );
} 