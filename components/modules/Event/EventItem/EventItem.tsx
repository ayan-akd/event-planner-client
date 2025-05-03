import { Button } from "@/components/ui/button";
import { TEvent } from "@/types/event.type";

const EventItem = ({ event }: { event: TEvent }) => {
  // Format Date
  // 31/06/2025
  const dateObj = new Date(event.startDate);
  const date = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1;
  const year = dateObj.getUTCFullYear();
  const formattedDate = `${date}/${month}/${year}`;
  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105">
      <div className="relative">
        <img
          className="w-full h-64 object-cover"
          src={event?.image}
          alt="Nature scene"
        />
        <div className="absolute top-0 right-0 bg-primary text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
          {event?.fee ? "Pro" : "Free"}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2">
          <dt className="text-gray-700">
            <span className="sr-only"> Published on </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
          </dt>

          <dd className="text-xs text-gray-700">{formattedDate}</dd>
        </div>
        <h2 className="text-lg md:text-xl 2xl:text-2xl font-bold mb-2 text-gray-800">
          {event?.title}
        </h2>
        <p className="text-gray-600 mb-4">
          {event?.description?.slice(0, 150)}
        </p>
        <div className="flex items-center mb-4">
          <svg
            className="h-5 w-5 text-yellow-500 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <span className="text-gray-600 ml-1">
            {event.reviews?.length} reviews
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg md:text-xl 2xl:text-2xl font-bold text-gray-800">
            ${event?.fee}
          </span>
          <Button>Join Now</Button>
        </div>
      </div>
    </div>
  );
};

export default EventItem;
