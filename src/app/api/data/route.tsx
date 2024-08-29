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
    //Generate  RequestURL for Admin Site for example url=article-category
    const address = `${process.env.BaseUrl}/${request.nextUrl.searchParams.get(
      "url"
    )}`;
    //Remove url parameter from other url parameters for example title=Mytitle&page=2
    request.nextUrl.searchParams.delete("url");
    const url =
      request.nextUrl.searchParams.size > 0
        ? address + "?" + request.nextUrl.searchParams.toString()
        : address;
    // console.log("URL:", url);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (res.status == 500)
      return Response.json(
        { message: "خطای سرور" },
        {
          status: 500,
        }
      );
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: res.status,
    });
  } catch (error: any) {
    return Response.json(
      { message: "دسترسی غیر مجاز" },
      {
        status: 401,
      }
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(process.env.TOKEN_NAME ?? "");

    if (!token)
      return Response.json(
        { message: "دسترسی غیر مجاز" },
        {
          status: 401,
        }
      );
    //Generate  RequestURL for Admin Site for example url=article-category
    const address = `${process.env.BaseUrl}${request.nextUrl.searchParams.get(
      "url"
    )}`;
    //Remove url parameter from other url parameters for example title=Mytitle&page=2
    request.nextUrl.searchParams.delete("url");

    const FormData = await request.json();
    const res = await fetch(address, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(FormData),
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
export async function PATCH(request: NextRequest) {
  try {
    const token = request.cookies.get(process.env.TOKEN_NAME ?? "");
    if (!token)
      return Response.json(
        { message: "دسترسی غیر مجاز" },
        {
          status: 401,
        }
      );
    //Generate  RequestURL for Admin Site for example url=article-category
    const address = `${process.env.BaseUrl}${request.nextUrl.searchParams.get(
      "url"
    )}`;
    //Remove url parameter from other url parameters for example title=Mytitle&page=2
    request.nextUrl.searchParams.delete("url");
    const FormData = await request.json();

    const res = await fetch(address, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(FormData),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.status,
    });
  } catch (error: any) {
    console.log(error);

    return Response.json(
      { message: "خطا در ارتباط با سرور رخ داده است" },
      {
        status: 401,
      }
    );
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get(process.env.TOKEN_NAME ?? "");

    if (!token)
      return Response.json(
        { message: "دسترسی غیر مجاز" },
        {
          status: 401,
        }
      );
    //Generate  RequestURL for Admin Site for example url=article-category
    const address = `${process.env.BaseUrl}${request.nextUrl.searchParams.get(
      "url"
    )}`;
    //Remove url parameter from other url parameters for example title=Mytitle&page=2
    request.nextUrl.searchParams.delete("url");

    const res = await fetch(address, {
      method: "DELETE",
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
