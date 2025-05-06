"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <div className={cn(
      "min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8",
      theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    )}>
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="flex justify-center">
            <AlertTriangle 
              className={cn(
                "h-24 w-24 mb-4",
                theme === "dark" ? "text-amber-500" : "text-amber-600"
              )} 
            />
          </div>
          <h1 className={cn(
            "text-6xl font-extrabold tracking-tight mb-2",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            404
          </h1>
          <h2 className={cn(
            "text-3xl font-bold mb-4",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            Page Not Found
          </h2>
          <p className={cn(
            "text-lg mb-8",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className={cn(
                "flex items-center gap-2",
                theme === "dark" ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-100"
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            
            <Button
              asChild
              className={cn(
                "flex items-center dark:text-white gap-2",
                theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
              )}
            >
              <Link href="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
        
        <div className={cn(
          "p-6 rounded-lg mt-8",
          theme === "dark" ? "bg-gray-800" : "bg-gray-50"
        )}>
          <h3 className={cn(
            "text-lg font-medium mb-2",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            Looking for something?
          </h3>
          <p className={cn(
            "text-sm mb-4",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            Try checking the navigation menu or visit our homepage to find what you&apos;re looking for.
          </p>
          <div className="flex justify-center">
            <Link 
              href="/contact" 
              className={cn(
                "text-sm font-medium",
                theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
              )}
            >
              Contact Support →
            </Link>
          </div>
        </div>
      </div>
      
      <div className={cn(
        "animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent",
        "absolute bottom-0 left-0 right-0 h-[1px]"
      )}></div>
    </div>
  );
}
