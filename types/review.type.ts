import { TEvent } from "./event.type";
import { IUser } from "./user.types";

export type TReview = {
    id: string;
    userId: string;
    eventId: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    user: IUser;
    event: TEvent;
  };