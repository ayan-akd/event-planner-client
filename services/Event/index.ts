"use server";

import { TEvent } from "@/types/event.type";
import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";

// Create Event
export const eventCreate = async (data: TEvent) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      }
    );
    await revalidateTag("EVENTS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Get Logged In User Event
export const getLoggedInUserEvent = async (
  searchTerm?: string,
  page?: string
) => {
  const token = await getValidToken();
  const params = new URLSearchParams();
  const pageNumber = page || 1;
  // searchTerm
  if (searchTerm) {
    params.append("searchTerm", searchTerm.toString());
  }
  params.append("page", pageNumber.toString());
  params.append("limit", "8");
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/events/my-events?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        next: {
          tags: ["EVENTS"],
        },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Get All Events
export const getAllEvents = async (
  searchTerm: string | null,
  page?: string
) => {
  const token = await getValidToken();
  const params = new URLSearchParams();
  const pageNumber = page || 1;
  // searchTerm
  if (searchTerm) {
    params.append("searchTerm", searchTerm.toString());
  }
  params.append("page", pageNumber.toString());
  params.append("limit", "8");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/events?${params.toString()}`,
      {
        method: "GET",
        next: {
          tags: ["EVENTS"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// Get Admin Selected Events
export const getAdminSelectedEvents = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/hero-event`,
      {
        method: "GET",
        next: {
          tags: ["ADMIN-EVENTS"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// Get Single Events
export const getSingleEvents = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${id}`
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// Delete Logged In User Single Event
export const deleteLoggedInUserSingleEvent = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    await revalidateTag("EVENTS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Admin Delete Any  Single Event
export const adminDeleteAnySingleEvent = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${id}/admin`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    await revalidateTag("EVENTS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Update Logged In User Single Event
export const updateLoggedInUserSingleEvent = async (
  id: string,
  payload: Partial<TEvent>
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      }
    );
    await revalidateTag("EVENTS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
