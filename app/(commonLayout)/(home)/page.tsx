import Hero from "@/components/modules/Home/Hero/Hero";
import HowItsWork from "@/components/modules/Home/HowItsWork/HowItsWork";
import UpcomingEvents from "@/components/modules/Home/UpcomingEvents/UpcomingEvents";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <UpcomingEvents />
      <HowItsWork />
    </div>
  );
};

export default HomePage;
