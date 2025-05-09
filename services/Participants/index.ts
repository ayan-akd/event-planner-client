"use server";

import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";

// Update Participant Event
export const updateParticipantStatus = async (
  payload: { status: string },
  id: string
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/participants/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Get All Participants for Logged In User
export const getAllParticipantsForLoggedInUser = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/participants/my-participants`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        next: {
          tags: ["MY-PARTICIPANT"],
        },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
// Join Event
export const joinEventFreeOrPaid = async (payload: {
  userId: string;
  eventId: string;
}) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/participants/create-participant`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Verify Payment
export const verifyPayment = async (orderId: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/participants/verify?order_id=${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//  Refund Payment
export const refundParticipantPayment = async (payload: {
  userId: string;
  eventId: string;
  participantId: string;
}) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/participants/refund`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      }
    );
    revalidateTag("MY-PARTICIPANT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
