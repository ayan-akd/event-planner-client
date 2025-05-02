import { TMeta } from "./meta.type";
import { IOrganizer } from "./user.types";

export type TEvent = {
  id: string;
  title: string;
  description: string;
  type: "ONLINE" | "OFFLINE";
  fee: number;
  image: string;
  startDate: string;
  endDate: string;
  venueOrLink: string;
  isPublic: boolean;
  isHero: boolean;
  isDeleted: boolean;
  organizerId: string;
  organizer: IOrganizer;
  participants: any[];
  invitations: any[];
  reviews: any[];
  createdAt: string;
  updatedAt: string;
};

export type TEventsResponse = {
  meta: TMeta;
  result: TEvent[];
};
