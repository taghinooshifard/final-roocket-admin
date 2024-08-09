import { TOKEN_NAME, BaseUrl } from "@/app/models/DefaultData";
import cookie from "cookie";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(TOKEN_NAME);
    if (!token)
      return Response.json(
        { message: "دسترسی غیر مجاز" },
        {
          status: 401,
        }
      );
    const res = await fetch(`${BaseUrl}/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });
    const data = await res.json();
    if (res.status == 200)
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          "Set-Cookie": cookie.serialize(TOKEN_NAME, "", {
            httpOnly: true,
            maxAge: 0,
            sameSite: "lax",
            path: "/",
          }),
        },
      });
    else
      return Response.json(
        { message: "خطا هنگام خروج رخ داده است" },
        {
          status: 401,
        }
      );
  } catch (e) {
    return Response.json(
      { message: "خطا هنگام خروج رخ داده است" },
      {
        status: 401,
      }
    );
  }
}
