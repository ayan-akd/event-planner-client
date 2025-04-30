import { Button } from "@/components/ui/button";
import { monthNameList } from "@/constants";
import { TUpcomingEvent } from "@/types/homepage.type";
import { BadgeCheck, BadgeDollarSign, Crown, Star } from "lucide-react";

const UpcomingEventsItem = ({ event }: { event: TUpcomingEvent }) => {
  return (
    <div key={event.id} className="rounded overflow-hidden shadow-lg">
      <div className="relative">
        <img className="w-full" src={event.image} alt={event.title} />
        <div className="hover:bg-transparent transition duration-300 absolute inset-0 bg-gray-900 opacity-25" />
        <div className="absolute bottom-0 left-0 bg-indigo-600 px-4 py-2 text-white text-sm hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out flex gap-1 items-center">
          {event?.isFree ? (
            <>
              <BadgeDollarSign size={18} /> <span>Free</span>
            </>
          ) : (
            <>
              <Crown size={18} /> <span>Pro</span>
            </>
          )}
        </div>
        <div className="text-sm absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
          <span className="font-bold">
            {new Date(event.createdAt).getDate()}
          </span>
          <small>{monthNameList[new Date(event.createdAt).getMonth()]}</small>
        </div>
      </div>

      <div className="px-6 py-4">
        <h2 className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">
          {event.title}
        </h2>
        <p className="text-gray-500 text-sm">{event.description}</p>
      </div>

      <div className="px-6 py-4 flex flex-row items-center">
        <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">
          {/* Time Icon */}
          <svg
            height="13px"
            width="13px"
            viewBox="0 0 512 512"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256
                    c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128
                    c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"
            />
          </svg>
          {/* <span className="ml-1">{event.readTime}</span> */}
        </span>
      </div>
    </div>
  );
};

export default UpcomingEventsItem;
