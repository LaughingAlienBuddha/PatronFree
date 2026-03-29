// lib/api-client.ts
// Production-ready API client for Patronex frontend with Firebase Auth

import { auth } from './firebase';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
}

// Helper to delay between retries
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generic API call function with Firebase ID Token handling and retry logic
 * Automatically gets fresh token from Firebase and adds to Authorization header
 */
export async function apiCall<T = any>(
  endpoint: string,
  options: RequestInit = {},
  retries = 2
): Promise<ApiResponse<T>> {
  let lastError: any;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Get current user from Firebase
      const user = auth.currentUser;
      if (!user) {
        return {
          success: false,
          message: 'Not authenticated. Please login first.',
        };
      }

      // Get fresh Firebase ID token
      const idToken = await user.getIdToken(attempt > 0); // Force refresh on retry

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      };

      if (options.headers && typeof options.headers === 'object') {
        Object.assign(headers, options.headers);
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        signal: options.signal,
      });

      // Handle non-OK responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP ${response.status}` }));
        throw new Error(errorData.message || `API Error: ${response.status}`);
      }

      const data: ApiResponse<T> = await response.json();
      return data;

    } catch (error: any) {
      lastError = error;
      
      // Handle abort errors gracefully - don't retry, just return
      if (error.name === 'AbortError' || error.message?.includes('aborted')) {
        return {
          success: false,
          message: 'Request timed out',
        };
      }
      
      console.warn(`⚠️ API attempt ${attempt + 1}/${retries + 1} failed [${endpoint}]:`, error.message);

      // Don't retry on authentication errors
      if (error.message?.includes('Not authenticated')) {
        return {
          success: false,
          message: error.message,
        };
      }

      // If we have retries left, wait before trying again
      if (attempt < retries) {
        const waitTime = Math.min(1000 * Math.pow(2, attempt), 5000); // Exponential backoff, max 5s
        console.log(`⏳ Retrying in ${waitTime}ms...`);
        await delay(waitTime);
      }
    }
  }

  // All retries exhausted
  console.error(`❌ API Error [${endpoint}]:`, lastError);
  return {
    success: false,
    message: lastError?.message || 'Failed to connect to server. Please check your internet connection.',
  };
}

/**
 * Upload files with Firebase ID Token
 * Expects backend to receive file URL and metadata (use cloud storage like Cloudinary)
 */
export async function uploadFile<T = any>(
  endpoint: string,
  fileUrl: string,
  additionalData: Record<string, any> = {}
): Promise<ApiResponse<T>> {
  try {
    // Get current user from Firebase
    const user = auth.currentUser;
    if (!user) {
      return {
        success: false,
        message: 'Not authenticated. Please login first.',
      };
    }

    // Get fresh Firebase ID token
    const idToken = await user.getIdToken(true);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        fileUrl,
        ...additionalData,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: `HTTP ${response.status}` }));
      throw new Error(errorData.message || 'File upload failed');
    }

    const data: ApiResponse<T> = await response.json();
    return data;

  } catch (error: any) {
    console.error(`❌ Upload Error [${endpoint}]:`, error);
    return {
      success: false,
      message: error?.message || 'Failed to upload file. Please try again.',
    };
  }
}

/**
 * Get current user's Firebase ID Token
 * Useful for custom implementations
 */
export async function getFirebaseIdToken(): Promise<string | null> {
  try {
    const user = auth.currentUser;
    if (!user) {
      return null;
    }
    return await user.getIdToken(true);
  } catch (error) {
    console.error('Error getting ID token:', error);
    return null;
  }
}
