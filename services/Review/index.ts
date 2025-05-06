"use server";

import { TReview } from "@/types/review.type";
import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";
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
    revalidateTag("REVIEWS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//  Get All Reviews For User
export const getAllReviews = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      next: {
        tags: ["REVIEWS"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//  Get All Reviews For Admin
export const getAllReviewsForAdmin = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/admin`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        next: {
          tags: ["REVIEWS"],
        },
      }
    );
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

//  Update Specific Review for Specific Event
export const updateReview = async (payload: Partial<TReview>, id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      }
    );
    revalidateTag("REVIEWS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//  Delete Specific Review for Specific Event
export const deleteReview = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/delete/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    revalidateTag("REVIEWS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
