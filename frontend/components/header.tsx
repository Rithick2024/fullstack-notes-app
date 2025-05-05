"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpenText,
  LogOut,
  Menu,
  Moon,
  PlusCircle,
  Sun,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Handle hydration issues by only rendering theme toggle on client
  useEffect(() => {
    setIsMounted(true);
    
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 flex h-16 items-center justify-around">
        <div className="mr-4 flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <div className="flex items-center gap-2 px-2">
                <BookOpenText className="h-5 w-5" />
                <Link href="/dashboard" className="font-semibold">
                  Notes-App
                </Link>
              </div>
              <div className="flex flex-col gap-3 mt-8">
                <Button 
                  variant={isActive("/dashboard") ? "secondary" : "ghost"} 
                  className="justify-start"
                  asChild
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                {/* <Button 
                  variant={isActive("/dashboard/new") ? "secondary" : "ghost"} 
                  className="justify-start"
                  asChild
                >
                  <Link href="/dashboard/new">New Note</Link>
                </Button> */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-center gap-2">
          <BookOpenText className="h-6 w-6" />
          <span className="hidden font-semibold md:inline-block">
            Notes-App
          </span>
        </div>
        <div className="flex-1 justify-end md:justify-center flex">
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link 
              href="/dashboard" 
              className={`transition-colors ${isActive("/dashboard") ? "text-foreground font-medium" : "text-muted-foreground"} hover:text-foreground`}
            >
              Dashboard
            </Link>
            <Link 
              href="/dashboard/new" 
              className={`transition-colors ${isActive("/dashboard/new") ? "text-foreground font-medium" : "text-muted-foreground"} hover:text-foreground`}
            >
              New Note
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {/* <Link href="/dashboard/new">
            <Button size="sm" className="hidden md:flex">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Note
            </Button>
          </Link> */}
          
          {isMounted && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  {theme === "dark" ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user && (
                <DropdownMenuItem disabled>
                  <span className="truncate max-w-[150px]">
                    {user.email}
                  </span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}