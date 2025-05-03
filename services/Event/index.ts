"use server";

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
