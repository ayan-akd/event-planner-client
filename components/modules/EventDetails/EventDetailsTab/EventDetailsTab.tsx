import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DetailsInfo from "./DetailsInfo";
import Reviews from "../Reviews/Reviews";
import { TEvent } from "@/types/event.type";

export function EventDetailsTabs({ event }: { event: TEvent }) {
  return (
    <div className="mt-10 flex justify-center items-center">
      <Tabs defaultValue="details">
        <div className="max-w-2xl">
          <TabsList className="grid w-full grid-cols-2 bg-primary/10">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
        </div>
        {/* One Tabe */}
        <TabsContent value="details">
          <DetailsInfo event={event} />
        </TabsContent>
        {/* Two Tabe */}
        <TabsContent value="reviews">
          <Reviews eventId={event?.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
