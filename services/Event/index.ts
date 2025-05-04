"use server";

import { TEvent } from "@/types/event.type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// Create Event
export const eventCreate = async (data: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("event_planner_token")
            ?.value as string,
        },
        body: JSON.stringify(data),
      }
    );
    revalidateTag("EVENTS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Get Logged In User Event
export const getLoggedInUserEvent = async (
  searchTerm: string,
  page?: string
) => {
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
          Authorization: (await cookies()).get("event_planner_token")
            ?.value as string,
        },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Get All Events
export const getAllEvents = async (query: {
  [key: string]: string | string[] | undefined;
}) => {
  const params = new URLSearchParams();
  if (query?.searchTerm) {
    params.append("searchTerm", query?.searchTerm?.toString());
  }
  if (query?.eventType) {
    params.append("eventType", query?.eventType?.toString());
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/events?${params.toString()}`,
      {
        method: "GET",
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
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("event_planner_token")
            ?.value as string,
        },
      }
    );
    revalidateTag("EVENTS");
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
  console.log("From U API", id);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("event_planner_token")
            ?.value as string,
        },
        body: JSON.stringify(payload),
      }
    );
    revalidateTag("EVENTS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
