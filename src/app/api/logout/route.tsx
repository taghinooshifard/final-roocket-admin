import { TOKEN_NAME } from "@/app/models/DefaultData";
import cookie from "cookie";

export async function POST(request: Request) {
  try {
    return Response.json(
      { message: "خروج با موفقیت انجام شد" },
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie.serialize(TOKEN_NAME, "", {
            httpOnly: true,
            maxAge: 0,
            sameSite: "lax",
            path: "/",
          }),
        },
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
