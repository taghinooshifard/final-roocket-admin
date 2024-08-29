import cookie from "cookie";
export async function POST(request: Request) {
  try {
    console.log("process.env.TOKEN_NAME:", process.env.TOKEN_NAME);
    console.log("process.env.MAX_AGE:", process.env.MAX_AGE);

    const { token } = await request.json();
    return Response.json(
      { token: token },
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie.serialize(process.env.TOKEN_NAME, token, {
            httpOnly: true,
            maxAge: process.env.MAX_AGE,
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
