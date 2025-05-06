"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Shield, Lock, Eye, FileText, Users, AlertTriangle } from "lucide-react";

export default function PrivacyPolicyPage() {
  const { theme } = useTheme();

  return (
    <div className={cn(
      "min-h-screen py-16 px-4 sm:px-6 lg:px-8",
      theme === "dark" ? " text-white" : "bg-white text-gray-900"
    )}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className={cn(
            "text-4xl font-extrabold tracking-tight sm:text-5xl mb-4",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            Privacy Policy
          </h1>
          <div className="flex justify-center">
            <div className={cn(
              "h-1 w-20 rounded",
              theme === "dark" ? "bg-blue-500" : "bg-blue-600"
            )}></div>
          </div>
          <p className={cn(
            "mt-6 text-xl",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            We value your privacy and are committed to protecting your personal information.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {privacySections.map((section, index) => (
            <div 
              key={index}
              className={cn(
                "p-6 rounded-lg transition-all duration-300",
                theme === "dark" 
                  ? "bg-gray-800 hover:bg-gray-750 shadow-md" 
                  : "bg-gray-50 hover:bg-gray-100 shadow-sm"
              )}
            >
              <div className="flex items-center mb-4">
                <div className={cn(
                  "p-2 rounded-full mr-4",
                  theme === "dark" ? "bg-blue-900" : "bg-blue-100"
                )}>
                  <section.icon className={cn(
                    "h-6 w-6",
                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                  )} />
                </div>
                <h2 className={cn(
                  "text-xl font-bold",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  {section.title}
                </h2>
              </div>
              <p className={cn(
                "text-base",
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}>
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className={cn(
          "mt-16 p-6 rounded-lg",
          theme === "dark" ? "bg-gray-800" : "bg-gray-50"
        )}>
          <h2 className={cn(
            "text-2xl font-bold mb-4",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            Contact Us
          </h2>
          <p className={cn(
            "text-base mb-4",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            If you have any questions about our Privacy Policy, please contact us:
          </p>
          <ul className={cn(
            "list-disc pl-5",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            <li className="mb-2">Email: privacy@eventplanner.com</li>
            <li className="mb-2">Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Event Street, Planning City, PC 12345</li>
          </ul>
        </div>

        <div className="text-center mt-16">
          <p className={cn(
            "text-sm",
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          )}>
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

const privacySections = [
  {
    title: "Information We Collect",
    content: "We collect personal information that you voluntarily provide to us when you register on our platform, express interest in obtaining information about us or our products and services, or otherwise contact us.",
    icon: FileText
  },
  {
    title: "How We Use Your Information",
    content: "We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect our platform and our users.",
    icon: Eye
  },
  {
    title: "Information Sharing",
    content: "We may share your information with event organizers when you register for events, and with service providers who perform services on our behalf.",
    icon: Users
  },
  {
    title: "Data Security",
    content: "We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process.",
    icon: Shield
  },
  {
    title: "Your Privacy Rights",
    content: "Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data.",
    icon: Lock
  },
  {
    title: "Third-Party Services",
    content: "Our platform may contain links to other websites, apps, or services that we do not own or operate. We are not responsible for the privacy practices of these third parties.",
    icon: AlertTriangle
  }
];
