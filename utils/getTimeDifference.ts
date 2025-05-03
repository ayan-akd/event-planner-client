import { formatDistanceToNow, parseISO } from "date-fns";

export const getTimeDifference = (myDate: string) => {
  const date = parseISO(myDate);
  const timeDiff = formatDistanceToNow(date, { addSuffix: true });
  return timeDiff;
};
