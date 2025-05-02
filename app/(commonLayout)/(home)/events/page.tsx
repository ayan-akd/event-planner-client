import Events from "@/components/modules/Event";
import { getAllEvents } from "@/services/Event";

const EventPage = async () => {
  return (
    <div>
      <Events />
    </div>
  );
};

export default EventPage;
