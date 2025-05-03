import Hero from "@/components/modules/Home/Hero/Hero";
import HowItsWork from "@/components/modules/Home/HowItsWork/HowItsWork";
import UpcomingEvents from "@/components/modules/Home/UpcomingEvents/UpcomingEvents";
import FaqSection from "@/components/modules/Home/Faq/FaqSection";
import NewsLetter from "@/components/modules/Home/Newsletter/NewsLetter";
import { getAdminSelectedEvents } from "@/services/Event";
import React from "react";

const HomePage = async () => {
  const { data } = await getAdminSelectedEvents();
  return (
    <div>
      <Hero data={data} />
      <UpcomingEvents />
      <HowItsWork />
      <FaqSection />
      <NewsLetter />
    </div>
  );
};

export default HomePage;
