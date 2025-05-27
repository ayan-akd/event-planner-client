"use client";
import { CalendarDays, MapPin, Users, Ticket, DollarSign } from "lucide-react";
import { TEvent } from "@/types/event.type";
import { timeFormatter } from "@/utils/timeFormater";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import getEventStatus from "@/utils/getEventStatus";
import ReviewAverage from "../../shared/ReviewAverage/ReviewAverage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";
import JoinEventButton from "../../EventDetails/EventDetailsTab/JoinEventButton";

const EventItem = ({ event }: { event: TEvent }) => {
  const { user } = useUser();
  const currentUserId = user ? user.userId : "";

  const status = getEventStatus(event) || "Ended";
  const statusColor = {
    upcoming:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
    ongoing:
      "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    ended: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  }[status.toLowerCase()];
  return (
    <div className="w-full bg-card rounded-xl shadow-sm border overflow-hidden transition-all duration-300 hover:shadow-md group h-full flex flex-col">
      <div className="relative aspect-video">
        <Image
          fill
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={event?.image}
          alt={event.title}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={false}
        />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <Badge className={cn("px-3 py-1 text-xs font-medium", statusColor)}>
            {status}
          </Badge>
          <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
            {event?.fee ? "Paid" : "Free"}
          </Badge>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <span className="inline-flex items-center gap-1">
            <Users className="h-4 w-4" />
            {event?.organizer.name}
          </span>
          <span className="mx-1 hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {event?.type || "Online"}
          </span>
        </div>

        <h3 className="text-xl font-semibold tracking-tight line-clamp-2 mt-3">
          {event?.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-3 mt-2 mb-4 flex-1">
          {event?.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2 text-sm">
          <div className="flex items-center gap-1.5 bg-accent/50 rounded-full px-3 py-1">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span>{timeFormatter(event.startDate)}</span>
          </div>
          {event.fee > 0 && (
            <div className="flex items-center gap-1.5 bg-accent/50 rounded-full px-3 py-1">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>${event.fee.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 mt-4 border-t gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <ReviewAverage reviews={event?.reviews} />
            <span className="text-sm text-muted-foreground">
              {event?.reviews?.length || 0} reviews
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6 items-center">
          <Button asChild variant="outline" className="w-full">
            <Link href={`/events/${event.id}`}>Details</Link>
          </Button>
          <JoinEventButton
            event={event}
            currentUserId={currentUserId}
            userId={currentUserId}
          />
        </div>
      </div>
    </div>
  );
};

export default EventItem;
