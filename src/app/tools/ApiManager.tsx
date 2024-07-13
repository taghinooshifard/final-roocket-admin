import MessageError from "../exceptions/MessageError";
import ValidationError from "../exceptions/validationErrors";

interface Props {
  url: string;
  values: any;
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
export async function Get(url: string) {
  try {
    const res = await fetch(url, {
      method: "GET",
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
