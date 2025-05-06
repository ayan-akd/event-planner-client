"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidateTag } from "next/cache";
// import { getCurrentUser } from "../AuthServices.ts";

export const makePayment = async (data: any) => {

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/init`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        //   Authorization: (await cookies()).get("event_planner_token")
        //     ?.value as string,
        },
        body: JSON.stringify(data),
      }
    );
    revalidateTag("PAYMENTS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};