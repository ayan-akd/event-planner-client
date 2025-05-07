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
import { TEvent } from "@/types/event.type";
const UpcomingEvents = ({ events }: { events: TEvent[] }) => {
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
            {events?.slice(0, 9)?.map((item: TEvent) => (
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
          <Button
            className="dark:text-white"
            size="sm"
            onClick={() => api?.scrollTo(current - 1)}
          >
            <ArrowLeft />
          </Button>
          <Button
            className="dark:text-white"
            size="sm"
            onClick={() => api?.scrollTo(current + 1)}
          >
            <ArrowRight />
          </Button>
        </div>
      </MyContainer>
    </div>
  );
};

export default UpcomingEvents;
