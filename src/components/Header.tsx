import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Mail } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: 'Home', ariaLabel: 'Home page', end: true },
  { to: '/experience', label: 'Work Experience', ariaLabel: 'Work Experience page' },
  { to: '/education', label: 'Education', ariaLabel: 'Education page' },
  { to: '/projects', label: 'Volunteering & Projects', ariaLabel: 'Volunteering and Projects page' },
  { to: '/playground', label: 'Playground', ariaLabel: 'Project Playground page' },
  { to: '/blog', label: 'Blog', ariaLabel: 'Blog page' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-foreground transition-opacity hover:opacity-85"
          aria-label="George Gittins Home"
        >
          <span className="flex size-9 items-center justify-center overflow-hidden rounded-lg border border-border bg-white shadow-xs">
            <img
              src="/favicon.png"
              alt="George Gittins logo"
              className="size-full scale-125 object-cover object-center"
            />
          </span>
          <span className="text-base font-semibold tracking-tight sm:text-lg">
            George Gittins
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          id="main-nav"
          className="hidden items-center gap-1 md:flex"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              aria-label={item.ariaLabel}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-accent text-foreground'
                    : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
            <a href="#contact" aria-label="Go to contact section">
              <Mail className="size-3.5" />
              Contact
            </a>
          </Button>

          <ThemeToggle />

          {/* Mobile Sheet Navigation */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label={isMenuOpen ? 'Close menu' : 'Open navigation menu'}
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center overflow-hidden rounded-md border border-border bg-white shadow-xs">
                    <img
                      src="/favicon.png"
                      alt="George Gittins logo"
                      className="size-full scale-125 object-cover object-center"
                    />
                  </span>
                  George Gittins
                </SheetTitle>
                <SheetDescription>
                  Data Science Consultant &amp; Systems Engineer
                </SheetDescription>
              </SheetHeader>
              <Separator />
              <nav className="flex flex-col gap-1 px-4" aria-label="Mobile Navigation">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      cn(
                        'rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-accent text-foreground'
                          : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Separator className="my-2" />
                <Button asChild variant="brand" className="w-full" onClick={closeMenu}>
                  <a href="#contact">
                    <Mail className="size-4" />
                    Get in Touch
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
