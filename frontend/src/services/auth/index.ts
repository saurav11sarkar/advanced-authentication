"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

export const register = async (data: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const json = await res.json();
    (await cookies()).set("token", json.data.token);
    return json;
  } catch (error: any) {
    return Error(error);
  }
};

export const login = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    (await cookies()).set("token", json.data.token);
    return json;
  } catch (error: any) {
    return Error(error);
  }
};

export const logout = async () => {
  try {
    (await cookies()).delete("token");
    return true;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const token = (await cookies()).get("token")?.value;
    let decoded = null;
    if (token) {
      decoded = jwtDecode<{ exp: number }>(token);
    }
    return decoded;
  } catch (error: any) {
    return Error(error);
  }
};

export const getUser = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${(await cookies()).get("token")?.value}`,
      },
      credentials: "include",
    });
    const json = await res.json();
    return json;
  } catch (error: any) {
    return Error(error);
  }
};
