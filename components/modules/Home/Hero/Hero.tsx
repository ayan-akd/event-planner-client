"use client";

import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className=" relative bg-[url(https://res.cloudinary.com/da02dbjrc/image/upload/v1745952182/event-plannerpeople-partying-ezgif.com-webp-to-jpg-converter_zky3es.jpg)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 to-gray-900/20"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-xl text-center mx-auto">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            Your Event Our Passion
            <strong className="block font-extrabold text-primary">
              Perfectly Planned
            </strong>
          </h1>

          <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
            Enjoy stress-free events with expert planning and flawless
            execution.
          </p>
          <div>
            <Button className="cursor-pointer">Join Event</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
