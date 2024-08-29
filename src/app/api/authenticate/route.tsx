export async function POST(request: Request) {
  try {
    const loginFormData = await request.json();
    const res = await fetch(`${process.env.BaseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginFormData),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.status,
    });
  } catch (error: any) {
    return Response.json(
      { message: "خطا در زمان ارتباط با سرور رخ داده است" },
      {
        status: 401,
      }
    );
  }
}
