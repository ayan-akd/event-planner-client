import Pagination from "../../shared/Pagination/Pagination";
import EventItem from "../EventItem/EventItem";
import FilterSidebar from "../FilterSidebar/FilterSidebar";

const AllEvents = async () => {
  return (
    <div className="flex gap-5 my-10 relative">
      {/* Sidebar */}
      <FilterSidebar />

      <div className="flex-1">
        <div className="grid xl:grid-cols-3 xl:gap-5 lg:grid-cols-3 lg:gap-3 md:grid-cols-2 md:gap-3 grid-cols-1 gap-2">
          <EventItem />
          <EventItem />
          <EventItem />
          <EventItem />
        </div>
        <div className="mt-6">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
