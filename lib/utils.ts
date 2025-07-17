import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to make API requests with SSL handling
export const fetchWithSSL = async (url: string, options: RequestInit = {}) => {
  // For Next.js server-side, we need to set the NODE_TLS_REJECT_UNAUTHORIZED environment variable
  const originalRejectUnauthorized = process.env.NODE_TLS_REJECT_UNAUTHORIZED
  
  try {
    // Temporarily disable SSL certificate validation
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    
    const response = await fetch(url, {
      ...options,
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000)
    })
    
    return response
  } finally {
    // Restore the original setting
    if (originalRejectUnauthorized !== undefined) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = originalRejectUnauthorized
    } else {
      delete process.env.NODE_TLS_REJECT_UNAUTHORIZED
    }
  }
}
