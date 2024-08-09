import { MAX_AGE, TOKEN_NAME, BaseUrl } from "@/app/models/DefaultData";

import cookie from "cookie";
import { NextRequest } from "next/server";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    return Response.json(
      { token: token },
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie.serialize(TOKEN_NAME, token, {
            httpOnly: true,
            maxAge: MAX_AGE,
            sameSite: "lax",
            path: "/",
          }),
        },
      }
    );
  } catch (e) {
    return Response.json(
      { message: "خطا در هنگام ورود رخ داده است" },
      {
        status: 401,
      }
    );
  }
}
