'use client';

import { env } from '@/env';
import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import { Button } from '@repo/design-system/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@repo/design-system/components/ui/navigation-menu';
import { Menu, MoveRight, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

import type { Dictionary } from '@repo/internationalization';
import Image from 'next/image';
import { LanguageSwitcher } from './language-switcher';
import logo from '@/public/logo.png';

type HeaderProps = {
  dictionary: Dictionary;
  locale: string;
};

export const Header = ({ dictionary, locale }: HeaderProps) => {
  const pathname = usePathname();

  const navigationItems = [
    {
      title: dictionary.web.header.home || 'Home',
      href: `/${locale}`,
    },
    {
      title: dictionary.web.home.features.title || 'Ventajas',
      href: `/${locale}#ventajas`,
    },
    {
      title: dictionary.web.home.stats.title || 'Proceso',
      href: `/${locale}#proceso`,
    },
    {
      title: dictionary.web.home.faq.title || 'Preguntas',
      href: `/${locale}#faq`,
    }
  ];

  const [isOpen, setOpen] = useState(false);
  return (
    <header className="sticky top-0 left-0 z-40 w-full border-b bg-background">
      <div className="container relative mx-auto flex items-center justify-between min-h-16 px-4">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Finna - Préstamos Personales"
              width={100}
              height={40}
              className="w-auto h-10"
            />
            <span className="text-xl font-bold text-green-600">Finna</span>
          </Link>
        </div>

        {/* Navigation in the center - desktop only */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-row justify-center gap-2">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <Button variant="ghost" asChild className="font-nunito font-bold hover:text-green-600 px-2">
                      <Link href={item.href}>{item.title}</Link>
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <ModeToggle />
            <Button variant="outline" asChild className="hidden md:inline font-nunito font-bold border-green-600 text-green-600 hover:bg-green-50 px-3 py-1 h-9">
              {env.NEXT_PUBLIC_APP_URL && (
                <Link href={`${env.NEXT_PUBLIC_APP_URL}/sign-in`}>
                  {dictionary.web.header.signIn}
                </Link>
              )}
            </Button>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-white font-nunito font-bold px-3 py-1 h-9" asChild>
            <Link href="https://wa.me/5493816437968?text=Hola, quiero solicitar un préstamo con Finna" target="_blank">
              {dictionary.web.global.primaryCta}
            </Link>
          </Button>

          {/* Mobile menu button */}
          <Button variant="ghost" onClick={() => setOpen(!isOpen)} className="lg:hidden ml-2 px-2">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile navigation menu */}
        {isOpen && (
          <div className="lg:hidden container absolute top-16 left-0 right-0 flex w-full flex-col gap-6 border-t bg-background py-4 shadow-lg z-50">
            {navigationItems.map((item) => (
              <div key={item.title}>
                <div className="flex flex-col gap-2">
                  <Link
                    href={item.href}
                    className="flex items-center justify-between font-nunito font-bold px-4"
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-lg">{item.title}</span>
                    <MoveRight className="h-4 w-4 stroke-1 text-muted-foreground" />
                  </Link>
                </div>
              </div>
            ))}
            <div className="px-4">
              <Link
                href="https://wa.me/5493816437968?text=Hola, quiero solicitar un préstamo con Finna"
                target="_blank"
                className="flex items-center justify-between font-nunito font-bold text-green-600"
                onClick={() => setOpen(false)}
              >
                <span className="text-lg">{dictionary.web.global.primaryCta}</span>
                <MoveRight className="h-4 w-4 stroke-1 text-green-600" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
