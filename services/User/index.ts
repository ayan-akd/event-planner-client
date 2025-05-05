"use server";

import { TUserRole, TUserStatus } from "@/types/user.types";
import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";

export const getAllUsers = async (searchTerm: string, page?: string, limit?: string) => {
  const token = await getValidToken();
  const params = new URLSearchParams();
  const pageNumber = page || 1;
  if (searchTerm) {
    params.append("searchTerm", searchTerm.toString());
  }
  params.append("page", pageNumber.toString());
  params.append("limit", limit || "10");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        next: {
          tags: ["USERS"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleUser = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const changeRole = async (id: string, data: { role: TUserRole }) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      }
    );
    await revalidateTag("USERS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const changeStatus = async (
  id: string,
  data: { status: TUserStatus }
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/change-status/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      }
    );
    await revalidateTag("USERS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteUser = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    await revalidateTag("USERS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
