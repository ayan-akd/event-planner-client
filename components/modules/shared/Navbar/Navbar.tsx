"use client";
import {
  LogOut,
  MenuIcon,
  ChevronDown,
  User,
  Settings,
  Calendar,
} from "lucide-react";
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
import { getMe, logOutUser } from "@/services/AuthServices.ts";
import { ToggleButton } from "@/components/ui/ToggleButton";
import { useEffect, useRef, useState } from "react";
import AppLogo from "../AppLogo/AppLogo";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IUser } from "@/types/user.types";

export default function Navbar() {
  const { user, setIsLoading, contextLogout, refreshUser } = useUser();
  const [meInfo, setMeInfo] = useState<IUser | null>(null);
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
    `relative transition-colors duration-200 hover:text-primary flex items-center gap-1 ${
      isActive(path)
        ? "text-primary font-medium after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary after:rounded-full"
        : "text-foreground/80 hover:text-primary"
    }`;

  // Get Me
  useEffect(() => {
    const getMeData = async () => {
      const res = await getMe();
      setMeInfo(res);
    };
    getMeData();
  }, []);
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex justify-between items-center mx-auto h-16 px-4 sm:px-6">
        <AppLogo />

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center relative">
          <nav>
            <ul className="flex items-center gap-6 text-sm font-medium">
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
                  Events{" "}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </Link>

                {isEventsOpen && (
                  <div
                    className="absolute left-0 top-full mt-2 grid grid-cols-2 gap-8 bg-popover p-6 rounded-lg shadow-lg w-[500px] z-50 border animate-in fade-in-80 slide-in-from-top-2"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            Public Events
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Open to everyone
                          </p>
                        </div>
                      </div>
                      <div className="pl-11 space-y-1">
                        <button
                          onClick={() =>
                            handleSearchQuery("eventType", "FREE_PUBLIC")
                          }
                          className="block w-full text-left text-sm hover:text-primary transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-50/5 dark:hover:text-gray-400"
                        >
                          <span className="px-2 py-2 inline-block">
                            Free Events
                          </span>
                        </button>
                        <button
                          onClick={() =>
                            handleSearchQuery("eventType", "PAID_PUBLIC")
                          }
                          className="block w-full text-left text-sm hover:text-primary transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-50/5 dark:hover:text-gray-400"
                        >
                          <span className="px-2 py-2 inline-block">
                            Paid Events
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-secondary text-secondary-foreground">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            Private Events
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Exclusive access
                          </p>
                        </div>
                      </div>
                      <div className="pl-11 space-y-3">
                        <button
                          onClick={() => {
                            if (!user) return;
                            handleSearchQuery("eventType", "FREE_PRIVATE");
                          }}
                          className={`block w-full text-left text-sm hover:text-primary transition-colors  hover:bg-gray-100 dark:hover:bg-gray-50/5 dark:hover:text-gray-400 ${
                            !user
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          title={!user ? "Login required to access" : ""}
                        >
                          <span className="px-2 py-2 inline-block">
                            Private Free Events
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            if (!user) return;
                            handleSearchQuery("eventType", "PAID_PRIVATE");
                          }}
                          className={`block w-full text-left text-sm hover:text-primary transition-colors  hover:bg-gray-100 dark:hover:bg-gray-50/5 dark:hover:text-gray-400 ${
                            !user
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          title={!user ? "Login required to access" : ""}
                        >
                          <span className="px-2 py-2 inline-block">
                            Private Paid Events
                          </span>
                        </button>
                      </div>
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
                <Link href="/community" className={navItemClass("/community")}>
                  Community
                </Link>
              </li>
              <li>
                <Link href="/about" className={navItemClass("/about")}>
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-secondary"
                >
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="w-full">
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/events" className="w-full">
                    Events
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/announcements" className="w-full">
                    Announcements
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/community" className="w-full">
                    Community
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about" className="w-full">
                    About
                  </Link>
                </DropdownMenuItem>
                {user && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile" className="w-full">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop User */}
          <div className="hidden md:flex items-center gap-2">
            <ToggleButton />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={image} alt={"User"} />
                      <AvatarFallback className="uppercase bg-primary text-primary-foreground">
                        {meInfo?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {meInfo?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/profile"
                      className="w-full cursor-pointer"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/profile"
                      className="w-full cursor-pointer"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="w-full cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button
                  variant="default"
                  className="rounded-full px-6 dark:text-white"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
