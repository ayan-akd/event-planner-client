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
import { useEffect } from "react";
import AppLogo from "../AppLogo/AppLogo";
export default function Navbar() {
  const { user, setIsLoading, contextLogout, refreshUser } = useUser();

  useEffect(() => {
    if (!user) {
      refreshUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Handle Logout
  const handleLogout = () => {
    logOutUser();
    contextLogout();
    setIsLoading(true);
  };
  const image =
    user?.profileImage ||
    "https://res.cloudinary.com/djlpoyqau/image/upload/v1741195711/clinets-profile_gwta7f.png";
  return (
    <header className="border-b w-full">
      <div className="container flex justify-between items-center mx-auto h-16 px-3">
        {/* <h1 className=" text-lg md:text-2xl font-black flex items-center">
          <Link href="/">EvenZo</Link>
        </h1> */}
        <AppLogo />
        <div className="max-w-md hidden md:flex flex-grow">
          <nav>
            <ul className="flex items-center gap-3 md:gap-7">
              <li>
                <Link href="/" className="transition-all hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="transition-all hover:text-primary"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-all hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-all hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex gap-2">
          <div className="md:hidden flex justify-center items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <MenuIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/events">Events</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/about">About Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/contact">Contact Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard/profile">Dashboard</Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="">
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
                      <Button effect={"shine"} className="dark:text-white">
                        Login
                      </Button>
                    </Link>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ToggleButton />
          </div>
          <div className="hidden md:flex md:justify-center md:items-center gap-2">
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
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button effect={"shine"} className="dark:text-white">
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
