import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(process.env.TOKEN_NAME ?? "");
    if (!token)
      return Response.json(
        { message: "دسترسی غیر مجاز" },
        {
          status: 401,
        }
      );
    const res = await fetch(`${process.env.BaseUrl}/current-user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: res.status,
    });
  } catch (error: any) {
    return Response.json(
      { message: "خطا در ارتباط با سرور رخ داده است" },
      {
        status: 401,
      }
    );
  }
}
