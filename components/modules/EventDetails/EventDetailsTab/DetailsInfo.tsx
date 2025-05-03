import { TEvent } from "@/types/event.type";
import { timeFormatter } from "@/utils/timeFormater";
import Link from "next/link";
import React from "react";

const DetailsInfo = ({ event }: { event: TEvent }) => {
  return (
    <div className="flow-root max-w-2xl mt-10">
      <dl className="-my-3 divide-y divide-gray-100 text-sm">
        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Title</dt>
          <dd className="text-gray-700 sm:col-span-2">{event?.title}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Organized By</dt>
          <dd className="text-gray-700 sm:col-span-2">
            {event?.organizer.name}
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Event Type</dt>
          <dd className="text-gray-700 sm:col-span-2">{event?.type}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Fee</dt>
          <dd className="text-gray-700 sm:col-span-2">${event?.fee}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Start Date</dt>
          <dd className="text-gray-700 sm:col-span-2">
            {timeFormatter(event.startDate)}
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">End Date</dt>
          <dd className="text-gray-700 sm:col-span-2">
            {" "}
            {timeFormatter(event.endDate)}
          </dd>
        </div>
        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Venue/Link</dt>
          <dd className="text-gray-700 sm:col-span-2">
            {/* {event?.venueOrLink} */}
            {event?.type === "ONLINE" ? (
              <Link
                href={event?.venueOrLink}
                target="_blank"
                className="text-primary underline"
              >
                {event?.venueOrLink}
              </Link>
            ) : (
              <span>{event?.venueOrLink}</span>
            )}
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Description</dt>
          <dd className="text-gray-700 sm:col-span-2">{event?.description}</dd>
        </div>
      </dl>
    </div>
  );
};

export default DetailsInfo;
