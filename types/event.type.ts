import { TInvitation } from "./invitation.type";
import { TMeta } from "./meta.type";
import { TParticipant } from "./participant.type";
import { TReview } from "./review.type";
import { IUser } from "./user.types";

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
  organizer: IUser;
  participants: TParticipant[];
  invitations: TInvitation[];
  reviews: TReview[];
  createdAt: string;
  updatedAt: string;
};

export type TEventsResponse = {
  meta: TMeta;
  result: TEvent[];
};
