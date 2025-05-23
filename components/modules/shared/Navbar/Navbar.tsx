"use client";
import { LogOut, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/UserContext";
import { logOutUser } from "@/services/AuthServices.ts";
import { ToggleButton } from "@/components/ui/ToggleButton";
import { useEffect, useRef, useState } from "react";
import AppLogo from "../AppLogo/AppLogo";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Navbar() {
  const { user, setIsLoading, contextLogout, refreshUser } = useUser();
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  // Handle Query
  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(query, value.toString());
    router.push(`/events?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (!user) {
      refreshUser();
    }
  }, []);

  const handleLogout = () => {
    logOutUser();
    contextLogout();
    setIsLoading(true);
  };

  const image =
    user?.profileImage ||
    "https://res.cloudinary.com/djlpoyqau/image/upload/v1741195711/clinets-profile_gwta7f.png";

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsEventsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsEventsOpen(false);
    }, 150);
  };

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const navItemClass = (path: string) =>
    `relative transition-colors duration-200 hover:text-primary ${
      isActive(path)
        ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary after:rounded-full"
        : "text-muted-foreground"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-background border-b shadow-sm transition-all duration-300">
      <div className="container flex justify-between items-center mx-auto h-16 px-3">
        <AppLogo />

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center relative">
          <nav>
            <ul className="flex items-center gap-8 text-sm font-medium">
              <li>
                <Link href="/" className={navItemClass("/")}>
                  Home
                </Link>
              </li>

              {/* Mega Menu */}
              <li
                className="relative group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link href="/events" className={navItemClass("/events")}>
                  Events
                </Link>

                {isEventsOpen && (
                  <div className="absolute left-0 top-full mt-4 grid grid-cols-2 gap-6 bg-white dark:bg-muted p-6 rounded-xl shadow-2xl w-[480px] z-50 border animate-fade-in">
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Public Events
                      </p>
                      <span
                        onClick={() =>
                          handleSearchQuery("eventType", "FREE_PUBLIC")
                        }
                        className="hover:text-primary text-sm cursor-pointer"
                      >
                        Free Events
                      </span>
                      <span
                        onClick={() =>
                          handleSearchQuery("eventType", "PAID_PUBLIC")
                        }
                        className="hover:text-primary text-sm cursor-pointer"
                      >
                        Paid Events
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Private Events
                      </p>
                      <span
                        onClick={() => {
                          if (!user) return;
                          handleSearchQuery("eventType", "FREE_PRIVATE");
                        }}
                        className={`text-sm cursor-pointer hover:text-primary ${
                          !user
                            ? "opacity-50 cursor-not-allowed text-muted-foreground"
                            : ""
                        }`}
                        title={!user ? "Login required to access" : ""}
                      >
                        Private Free Events
                      </span>
                      <span
                        onClick={() => {
                          if (!user) return;
                          handleSearchQuery("eventType", "PAID_PRIVATE");
                        }}
                        className={`text-sm cursor-pointer hover:text-primary ${
                          !user
                            ? "opacity-50 cursor-not-allowed text-muted-foreground"
                            : ""
                        }`}
                        title={!user ? "Login required to access" : ""}
                      >
                        Private Paid Events
                      </span>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <Link
                  href="/announcements"
                  className={navItemClass("/announcements")}
                >
                  Announcements
                </Link>
              </li>
              <li>
                <Link href="/about" className={navItemClass("/about")}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className={navItemClass("/contact")}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <MenuIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuItem>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href="/events">All Events</Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href="/about">About Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/contact">Contact Us</Link>
                </DropdownMenuItem>
                {user && (
                  <DropdownMenuItem>
                    <Link href="/dashboard/profile">Dashboard</Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem>
                  {user ? (
                    <Link href="/dashboard/profile">
                      <Avatar>
                        <AvatarImage src={image} />
                        <AvatarFallback className="uppercase">
                          USER
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                  ) : (
                    <Link href="/login">
                      <Button effect="shine" className="dark:text-white">
                        Login
                      </Button>
                    </Link>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ToggleButton />
          </div>

          {/* Desktop User */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={image} />
                    <AvatarFallback className="uppercase">USER</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/dashboard/profile">
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button effect="shine" className="dark:text-white">
                  Login
                </Button>
              </Link>
            )}
            <ToggleButton />
          </div>
        </div>
      </div>
    </header>
  );
}
