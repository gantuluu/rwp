import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl() {
  // In AI Studio, we should prefer the current environment's URL
  // If APP_URL is set, use it, otherwise try to fallback safely
  const url = (process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || '').trim();
  
  if (url) return url.replace(/\/$/, '');
  
  // Fallback for development
  return 'http://localhost:3000';
}
