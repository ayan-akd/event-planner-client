"use client";
import { TEvent, TEventsResponse } from "@/types/event.type";
import Pagination from "../../shared/Pagination/Pagination";
import EventItem from "../EventItem/EventItem";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import { useEffect, useState } from "react";
import EventSkeleton from "../../shared/EventSkeleton/EventSkeleton";
import { useSearchParams } from "next/navigation";

const AllEvents = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const query = new URLSearchParams();

  //  Get Search Params
  const searchParams = useSearchParams();
  const eventType = searchParams.get("eventType");
  const searchTerm = searchParams.get("searchTerm");

  // Append Query Params
  if (eventType) query.append("eventType", eventType);
  if (searchTerm) query.append("searchTerm", searchTerm);

  // Fetch Data
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/events?${query.toString()}`
        );

        const { data } = await res.json();
        setEvents(data.result);
      } catch (err: any) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [eventType, searchTerm]);
  return (
    <div className="flex gap-5 my-10 relative">
      {/* Sidebar */}
      <FilterSidebar />

      <div className="flex-1">
        <div className="grid xl:grid-cols-3 xl:gap-5 lg:grid-cols-3 lg:gap-3 md:grid-cols-2 md:gap-3 grid-cols-1 gap-2">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <EventSkeleton key={i} />)
          ) : events?.length === 0 ? (
            <div className="text-center text-xl font-semibold">
              No events found
            </div>
          ) : (
            events?.map((event: TEvent) => (
              <EventItem key={event.id} event={event} />
            ))
          )}
        </div>
        <div className="mt-6">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
