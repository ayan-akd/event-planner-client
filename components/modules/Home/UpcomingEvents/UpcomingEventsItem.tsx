import { Button } from "@/components/ui/button";
import { monthNameList } from "@/constants";
import { TUpcomingEvent } from "@/types/homepage.type";
import { BadgeDollarSign, Crown } from "lucide-react";
import Image from "next/image";

const UpcomingEventsItem = ({ event }: { event: TUpcomingEvent }) => {
  return (
    <div key={event.id} className="rounded overflow-hidden shadow-lg">
      <div className="relative">
        <Image
          width={500}
          height={300}
          className="w-full"
          src={event.image}
          alt={event.title}
        />
        <div className="hover:bg-transparent transition duration-300 absolute inset-0 bg-gray-900 opacity-25" />
        <div className="absolute bottom-0 left-0 bg-primary px-4 py-2 text-white text-sm hover:bg-white hover:text-primary transition duration-500 ease-in-out flex gap-1 items-center">
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
        <div className="text-sm absolute top-0 right-0 bg-primary px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-primary transition duration-500 ease-in-out">
          <span className="font-bold">
            {new Date(event.createdAt).getDate()}
          </span>
          <small>{monthNameList[new Date(event.createdAt).getMonth()]}</small>
        </div>
      </div>

      <div className="px-6 py-4">
        <h2 className="font-semibold text-lg inline-block hover:text-primary transition duration-500 ease-in-out">
          {event.title}
        </h2>
        <p className="text-gray-500 text-sm">{event.description}</p>
      </div>

      <div className="px-6 py-4 flex flex-row items-center">
        <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">
          <Button className="dark:text-white">Join Now</Button>
        </span>
      </div>
    </div>
  );
};

export default UpcomingEventsItem;
