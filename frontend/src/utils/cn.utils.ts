import { ClassValue, clsx } from "clsx";
import { twMerge } from 'tailwind-merge';

/** @description wrapper for 3rd party libs
 * builds className dynamically based on conditions etc.
 */
export function cn(...inputs: ClassValue[]): string {
  console.log('test');

  return twMerge(clsx(inputs));
}
