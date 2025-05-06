import { TEvent } from "@/types/event.type";
import { isAfter, isBefore, isWithinInterval, parseISO } from "date-fns";

const getEventStatus = (event: TEvent) => {
  const currentDate = new Date();
  const startDate = parseISO(event.startDate);
  const endDate = parseISO(event.endDate);
  if (isBefore(currentDate, startDate)) {
    return "Upcoming";
  } else if (
    isWithinInterval(currentDate, { start: startDate, end: endDate })
  ) {
    return "Ongoing";
  } else if (isAfter(currentDate, endDate)) {
    return "Completed";
  }
};

export default getEventStatus;
