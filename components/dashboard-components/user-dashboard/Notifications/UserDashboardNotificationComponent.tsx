"use client";
import { TInvitation, TInvitationStatus } from "@/types/invitation.type";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getTimeDifference } from "@/utils/getTimeDifference";
import { timeFormatter } from "@/utils/timeFormater";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import { updateInvitation } from "@/services/Invitations";
import { toast } from "sonner";
import { stat } from "fs";

export default function UserDashboardNotificationComponent({
  data,
}: {
  data: TInvitation[];
}) {
  const isMobile = useIsMobile();

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-semibold">No notifications</h2>
      </div>
    );
  }

  const handleMarkAsRead = async (id: string) => {
    const data = {
      hasRead: true,
    };
    const res = await updateInvitation(id, data);
    if (!res.success) {
      toast.error(res.message);
    }
  };

  const status: TInvitationStatus = "REJECTED";

  const handleDecline = async (id: string) => {
    const data = {
      status,
    };
    const res = await updateInvitation(id, data);
    if (!res.success) {
      toast.error(res.message);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Notifications</h1>
      <div className="space-y-4">
        {data.map((invitation) => (
          <div
            key={invitation.id}
            className={cn(
              "border rounded-lg p-4 shadow-sm transition-all",
              invitation.hasRead
                ? "bg-background/50 border-border"
                : "bg-background border-primary/20 dark:bg-background/80",
              !invitation.hasRead && "relative"
            )}
          >
            {!invitation.hasRead && (
              <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full"></div>
            )}

            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative w-full md:w-40 h-32 rounded-md overflow-hidden">
                <Image
                  src={
                    invitation.event.image ||
                    "https://placehold.co/400x300?text=No+Image"
                  }
                  alt={invitation.event.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold">
                    {invitation.event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Invited by {invitation.inviter.name} (
                    {invitation.inviter.username})
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {getTimeDifference(invitation.createdAt)}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Date:</span>{" "}
                    {timeFormatter(invitation.event.startDate)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Time:</span>{" "}
                    {new Date(invitation.event.startDate).toLocaleTimeString()}{" "}
                    - {new Date(invitation.event.endDate).toLocaleTimeString()}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Venue:</span>{" "}
                    {invitation.event.venueOrLink}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Type:</span>{" "}
                    {invitation.event.type}{" "}
                    {invitation.event.isPublic ? "(Public)" : "(Private)"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {invitation.event.fee === 0 ? (
                    <Button
                      variant="default"
                      size={isMobile ? "sm" : "default"}
                      className="dark:text-white"
                    >
                      Accept Invitation
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      size={isMobile ? "sm" : "default"}
                      className="dark:text-white"
                    >
                      Pay & Accept (${invitation.event.fee})
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDecline(invitation.id)}
                    variant="outline"
                    size={isMobile ? "sm" : "default"}
                  >
                    Decline
                  </Button>

                  {!invitation.hasRead && (
                    <Button
                      variant="ghost"
                      size={isMobile ? "sm" : "default"}
                      onClick={() => handleMarkAsRead(invitation.id)}
                      className="ml-auto"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Mark as Read
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
