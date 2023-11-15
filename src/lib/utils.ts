import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type ApiResult = {
  status: string;
  result?: any;
  message?: string;
};

export async function respToResult(res: Response) {
  if (!res.ok || res.status !== 200) {
    if (res.body) {
      const { message } = await res.json();
      throw new Error(message);
    }
    throw new Error(res.statusText);
  }
  const data: ApiResult = await res.json();
  if (data.status !== "OK") {
    throw new Error(`${data.result}: ${data.message}`);
  }
  return JSON.parse(data.result!);
}

export function getInitialName(name: string) {
  return name.match(/(\b\S)?/g)?.join("");
}
