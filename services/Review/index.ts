"use server";

import { TEvent } from "@/types/event.type";
import { getValidToken } from "@/utils/verifyToken";
// import { revalidateTag } from "next/cache";

// Create Review
export const reviewCreate = async (data: {
  userId: string;
  comment: string;
  rating: number;
  eventId: string;
}) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
    // await revalidateTag("EVENTS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//  Get Specific Review for Specific Event
export const getSpecificReviewsForSpecificEvent = async (eventId: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/specific-event/${eventId}`
    );
    // await revalidateTag("EVENTS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
