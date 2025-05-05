"use server";
import { TInvitation } from "@/types/invitation.type";
import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";

export const getMyCreatedInvites = async () => {
    const token = await getValidToken();
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/invitations/my-created-invites`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                next: {
                    tags: ["INVITATIONS"],
                },
            }
        );
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const getMyReceivedInvites = async () => {
    const token = await getValidToken();
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/invitations/my-received-invites`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                next: {
                    tags: ["INVITATIONS"],
                },
            }
        );
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const createInvitation = async (data: {eventId: string, participantId: string}) => {
    const token = await getValidToken();
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/invitations`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(data),
            }
        );
        await revalidateTag("INVITATIONS");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};
