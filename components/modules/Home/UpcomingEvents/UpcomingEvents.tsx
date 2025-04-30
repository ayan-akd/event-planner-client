import React from "react";
import MyContainer from "../../shared/MyContainer/MyContainer";

import UpcomingEventsItem from "./UpcomingEventsItem";
import { upcomingEventsData } from "@/faker/UpcomingEvents";
import { TUpcomingEvent } from "@/types/homepage.type";

const UpcomingEvents = () => {
  return (
    <div>
      <MyContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-5 lg:gap-6 xl:gap-8">
          {upcomingEventsData?.map((item: TUpcomingEvent) => (
            <UpcomingEventsItem key={item.title} event={item} />
          ))}
        </div>
      </MyContainer>
    </div>
  );
};

export default UpcomingEvents;
