"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Film, Star, LogOut, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ isOpen = true, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  // const [userEmail, setUserEmail] = useState<string | null>("");

  useEffect(() => {
    setMounted(true);
    // const email = localStorage.getItem("userEmail");
    // if (email) {
    //   setUserEmail(email);
    // }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const links = [
    {
      href: "/all-movies",
      label: "All Movies",
      icon: <Film className="h-4 w-4" />,
    },
    {
      href: "/favorites",
      label: "Favorites",
      icon: <Star className="h-4 w-4" />,
    },
  ];

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transition-transform duration-300 ease-in-out",
          isMobile && !isOpen && "-translate-x-full",
          !isMobile && "translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/">Movie Hub</Link>
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={isMobile ? onToggle : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors",
                  pathname === link.href && "bg-muted text-primary"
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t space-y-3">
            {/* Profile Info */}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-red-500 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
