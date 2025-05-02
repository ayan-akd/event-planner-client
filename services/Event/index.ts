"use server";

// Get All Events
export const getAllEvents = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events`, {
      method: "GET",
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
