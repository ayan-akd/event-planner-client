"use server";

import { getValidToken } from "@/utils/verifyToken";

// Create Event
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
