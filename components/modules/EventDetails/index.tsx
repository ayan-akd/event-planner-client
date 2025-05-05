import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { EventDetailsTabs } from "./EventDetailsTab/EventDetailsTab";
import { getSingleEvents } from "@/services/Event";
import { timeFormatter } from "@/utils/timeFormater";
import { getCurrentUser } from "@/services/AuthServices.ts";
import JoinEventButton from "./EventDetailsTab/JoinEventButton";

const EventDetails = async ({ eventId }: { eventId: string }) => {
  const { data } = await getSingleEvents(eventId);
  const user = await getCurrentUser();
  const currentUserId = user ? user.userId : null;

      // for payment: userId and eventId needed
      const {userId} = user;

  return (
    <>
      <div className="border rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mt-10 md:mt-24">
        <div>
          <Image
            src={data?.image}
            alt="name"
            width={500}
            height={500}
            className="rounded-md w-full object-cover h-80"
          />
        </div>
        <div className="bg-white rounded-md p-4">
          <h2 className="font-bold text-xl mb-4">{data?.title}</h2>
          <p className="text-justify text-gray-500 font-light text-sm">
            {data?.description?.slice(0, 400)}
          </p>

          <div className="mt-5 font-bold">
            <h3>${data?.fee}</h3>
          </div>
          <div className="flex items-center gap-2 md:gap-8">
            <div>
              <p className="space-x-[1px]">
                <span className="text-xs bg-primary/80 py-[1px] px-1 rounded text-white">
                  Organized By
                </span>
                <span className="text-sm"> {data?.organizer.name}</span>
              </p>
            </div>
            <div className="flex items-center gap-1">
              <dl className="flex items-center gap-1">
                <dt className="text-gray-700">
                  <span className="sr-only"> Event Start </span>

                  <span className="text-xs bg-primary/80 py-[1px] px-1 rounded text-white">
                    Event Start
                  </span>
                </dt>

                <dd className="text-xs text-gray-700">
                  {timeFormatter(data?.startDate)}
                </dd>
              </dl>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3 mb-5 text-gray-500 text-xs">
            <p className="rounded-full px-4 py-1 bg-primary/20">
              Type: {data?.type}
            </p>
            <p className="rounded-full px-4 py-1 bg-primary/20">
              Participants: {data?.participants?.length}
            </p>
            <p className="rounded-full px-4 py-1 bg-primary/20 flex items-center justify-center gap-1">
              <Star className="w-4 h-4" fill="orange" stroke="orange" />
              Ratings ( {data?.ratings?.length || 0} )
            </p>
          </div>
          <hr />

          <JoinEventButton event={data} currentUserId={currentUserId} userId={userId} />
        </div>
      </div>
      <div className="p-4">
        <EventDetailsTabs event={data} />
      </div>
    </>
  );
};

export default EventDetails;
