import Hero from "@/components/modules/Home/Hero/Hero";
import UpcomingEvents from "@/components/modules/Home/UpcomingEvents/UpcomingEvents";
import { Button } from "@/components/ui/button";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <UpcomingEvents />
    </div>
  );
};

export default HomePage;
