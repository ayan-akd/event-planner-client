"use client";
import React, { useEffect } from "react";
import MyContainer from "../../shared/MyContainer/MyContainer";

import UpcomingEventsItem from "./UpcomingEventsItem";
import { upcomingEventsData } from "@/faker/UpcomingEvents";
import { TUpcomingEvent } from "@/types/homepage.type";
import { type CarouselApi } from "@/components/ui/carousel";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
const UpcomingEvents = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  return (
    // <div>
    //   <MyContainer>
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-5 lg:gap-6 xl:gap-8">
    //       {upcomingEventsData?.map((item: TUpcomingEvent) => (
    //         <UpcomingEventsItem key={item.title} event={item} />
    //       ))}
    //     </div>
    //   </MyContainer>
    // </div>
    <div className="">
      <MyContainer>
        <SectionTitle
          sectionTitle="Upcoming Events"
          sectionSubTitle="Discover exciting public events happening soon — don’t miss out!"
        />
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {upcomingEventsData?.map((item: TUpcomingEvent) => (
              <CarouselItem
                key={item?.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <UpcomingEventsItem key={item.title} event={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex justify-end mt-2 gap-2">
          <Button size="sm" onClick={() => api?.scrollTo(current - 1)}>
            <ArrowLeft />
          </Button>
          <Button size="sm" onClick={() => api?.scrollTo(current + 1)}>
            <ArrowRight />
          </Button>
        </div>
      </MyContainer>
    </div>
  );
};

export default UpcomingEvents;
