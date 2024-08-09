import MessageError from "../exceptions/MessageError";
import ValidationError from "../exceptions/validationErrors";

interface Props {
  url: string;
  values?: any;
}
export default async function Post(params: Props) {
  try {
    const res = await fetch(params.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params.values),
    });
    if (res.status == 401 || res.status == 500) {
      const data = await res.json();
      throw new MessageError(data?.message);
    }
    if (res.status == 422) {
      const data = await res.json();
      throw new ValidationError(data?.errors);
    }
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    throw error;
  }
}
export async function Patch(params: Props) {
  try {
    const res = await fetch(params.url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params.values),
    });
    if (res.status == 401 || res.status == 500) {
      const data = await res.json();
      throw new MessageError(data?.message);
    }
    if (res.status == 422) {
      const data = await res.json();
      throw new ValidationError(data?.errors);
    }
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    throw error;
  }
}
export async function Delete(params: Props) {
  try {
    const res = await fetch(params.url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status == 401 || res.status == 500) {
      const data = await res.json();
      throw new MessageError(data?.message);
    }
    if (res.status == 422) {
      const data = await res.json();
      throw new ValidationError(data?.errors);
    }
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    throw error;
  }
}
export async function Get(url: any) {
  try {
    let address = typeof url == "object" ? url?.url : url;
    // console.log(address);
    const res = await fetch(address, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status == 401 || res.status == 500) {
      // console.log(res);
      const data = await res.json();
      throw new MessageError(data?.message);
    }
    if (res.status == 422) {
      const data = await res.json();
      throw new ValidationError(data?.errors);
    }
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    throw error;
  }
}
