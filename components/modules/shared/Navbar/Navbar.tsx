"use client";
import { LogOut, MenuIcon, ShoppingBag } from "lucide-react";
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
export default function Navbar() {
  return (
    <header className="border-b  bg-white w-full">
      <div className="container flex justify-between items-center mx-auto h-16 px-3">
        <h1 className=" text-lg md:text-2xl font-black flex items-center">
          <Link href="/"> Evenzo</Link>
        </h1>
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
                  href="/shop"
                  className="transition-all hover:text-primary"
                >
                  Shop
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
            </ul>
          </nav>
        </div>
        <div className="flex gap-2">
          <div className="md:hidden flex">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <MenuIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/shop">Shop</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/about">About</Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="">
                  <Link href="/profile">
                    <Avatar>
                      <AvatarImage src="https://res.cloudinary.com/djlpoyqau/image/upload/v1741195711/clinets-profile_gwta7f.png" />
                      <AvatarFallback className="uppercase">
                        Sadi
                      </AvatarFallback>
                    </Avatar>
                  </Link>

                  <Link href="/login">
                    <Button className="">Login</Button>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://res.cloudinary.com/djlpoyqau/image/upload/v1741195711/clinets-profile_gwta7f.png" />
                  <AvatarFallback className="uppercase">Sadi</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/orders">Orders History</Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href="/admin">Dashboard</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <LogOut /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
