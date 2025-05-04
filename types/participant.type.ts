import { TEvent } from "./event.type";
import { IUser } from "./user.types";

export type TParticipant = {
    id: string;
    eventId: string;
    userId: string;
    status: TParticipantStatus;
    inviteId: string | null;
    hasPaid: boolean;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    user: IUser;
    event: TEvent;
  };

  export type TParticipantStatus = "PENDING" | "APPROVED" | "REJECTED" | "BANNED";