import { TEvent } from "./event.type";
import { IUser } from "./user.types";

export type TPayment = {
    id: string;
    userId: string;
    eventId: string;
    amount: number;
    status: TPaymentStatus;
    transactionId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    paymentGatewayData?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    user: IUser;
    event: TEvent;
  };

  export type TPaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "CANCELED";