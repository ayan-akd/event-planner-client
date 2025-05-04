import { TEvent } from "./event.type";
import { IUser } from "./user.types";

export type TInvitation = {
    id: string;
    participantId: string;
    eventId: string;
    status: TInvitationStatus;
    inviterId: string;
    hasRead: boolean;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    user: IUser;
    event: TEvent;
    inviter: IUser;
  };
  
  export type TInvitationStatus = "PENDING" | "ACCEPTED" | "REJECTED";