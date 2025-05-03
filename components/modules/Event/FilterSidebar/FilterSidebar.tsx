"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EventTypes } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFilterButton, setShowFilterButton] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  // Handle Search Query
  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(query, value.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  // Scroll Wise Handle Filter Button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setShowFilterButton(false);
      } else {
        setShowFilterButton(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {/*  Filter Button For Mobile Device */}

      {showFilterButton && (
        <Button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-20 left-4 z-50 p-2 rounded-md shadow-lg"
        >
          <Filter className="w-5 h-5" />
        </Button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-fit p-6 w-72 transition-transform duration-300 z-50 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:relative lg:w-60 lg:h-fit lg:block`}
      >
        {/* Close Button (Mobile) */}
        <Button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-gray-600"
        >
          <X className="w-6 h-6" />
        </Button>

        <div className="flex gap-4 md:gap-0 md:justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Filter</h2>
          <Button
            size="sm"
            className="dark:text-white"
            onClick={() => router.push(pathname, { scroll: false })}
          >
            Clear Filters
          </Button>
        </div>

        {/* Search Events */}
        <div className="mb-6">
          <Input
            placeholder="Search Event Here..."
            className="w-full"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleSearchQuery("searchTerm", e.target.value)
            }
          />
        </div>

        {/* Event Filter */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Filter Events</h2>
          <RadioGroup className="space-y-2">
            {EventTypes.map((eventType) => (
              <div key={eventType} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={eventType}
                  id={eventType}
                  onClick={() => handleSearchQuery("eventType", eventType)}
                />
                <Label className="text-gray-500 dark:text-white font-light">
                  {eventType === "FREE_PUBLIC" && "Public Free"}
                  {eventType === "PAID_PUBLIC" && "Public Paid"}
                  {eventType === "FREE_PRIVATE" && "Private Free"}
                  {eventType === "PAID_PRIVATE" && "Private Paid"}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
