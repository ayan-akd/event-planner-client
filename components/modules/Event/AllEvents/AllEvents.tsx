"use client";
import { TEvent } from "@/types/event.type";
import Pagination from "../../shared/Pagination/Pagination";
import EventItem from "../EventItem/EventItem";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import { useEffect, useMemo, useState } from "react";
import EventSkeleton from "../../shared/EventSkeleton/EventSkeleton";
import { useSearchParams } from "next/navigation";
import { set } from "date-fns";
import { useUser } from "@/context/UserContext";

const AllEvents = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { user } = useUser();

  //  Get Search Params
  const searchParams = useSearchParams();
  const eventType = searchParams.get("eventType");
  const searchTerm = searchParams.get("searchTerm");
  const page = searchParams.get("page");

  // Create query with useMemo
  const query = useMemo(() => {
    const queryParams = new URLSearchParams();
    if (eventType) queryParams.append("eventType", eventType);
    if (searchTerm) queryParams.append("searchTerm", searchTerm);
    if (page) queryParams.append("page", page);
    return queryParams;
  }, [eventType, searchTerm, page]);

  // Fetch Data
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/events?${query.toString()}`
        );

        const { data } = await res.json();
        setTotalPages(data.meta.totalPage);
        setEvents(data.result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [query]);
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
            events
              ?.filter((fEvent: TEvent) => {
                if (!user) return fEvent.isPublic;
                return true;
              })
              ?.map((event: TEvent) => (
                <EventItem key={event.id} event={event} />
              ))
          )}
        </div>
        <div className="mt-6">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};
export default AllEvents;
