import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const timeAgo = (date) => {
  if (!date) return "";
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
