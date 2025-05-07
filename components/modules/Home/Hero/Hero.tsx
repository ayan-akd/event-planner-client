import { Button } from "@/components/ui/button";
import { TEvent } from "@/types/event.type";
import Link from "next/link";

const Hero = ({ data }: { data: TEvent }) => {
  return (
    <section
      className="relative h-[300px] lg:h-[500px] 2xl:h-[600px] w-full bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{ backgroundImage: `url(${data?.image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 to-gray-900/20"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-xl text-center mx-auto">
          <h1
            title={data?.title}
            className="text-3xl capitalize font-extrabold text-white sm:text-5xl line-clamp-1"
          >
            {data?.title}
          </h1>

          <p
            title={data?.description}
            className="my-2 max-w-lg text-white sm:text-xl/relaxed line-clamp-2"
          >
            {data?.description}
          </p>
          <div>
            <Link href={`/events/${data?.id}`}>
              <Button
                effect={"shine"}
                className="cursor-pointer dark:text-white"
              >
                Join Event
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
