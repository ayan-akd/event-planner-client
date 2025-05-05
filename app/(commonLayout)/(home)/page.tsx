import Hero from "@/components/modules/Home/Hero/Hero";
import HowItsWork from "@/components/modules/Home/HowItsWork/HowItsWork";
import UpcomingEvents from "@/components/modules/Home/UpcomingEvents/UpcomingEvents";
import FaqSection from "@/components/modules/Home/Faq/FaqSection";
import NewsLetter from "@/components/modules/Home/Newsletter/NewsLetter";
import { getAdminSelectedEvents, getAllEvents } from "@/services/Event";
import React from "react";
import { TEvent } from "@/types/event.type";

const HomePage = async () => {
  const { data } = await getAdminSelectedEvents();
  const { data: events } = await getAllEvents(null);
  const upcomingEvents = events?.result?.filter((item: TEvent) => {
    const currentDate = new Date();
    const startDate = new Date(item?.startDate);
    return startDate > currentDate;
  });
  return (
    <div>
      <Hero data={data} />
      <UpcomingEvents events={upcomingEvents} />
      <HowItsWork />
      <FaqSection />
      <NewsLetter />
    </div>
  );
};

export default HomePage;
