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

/**
 * Generic API call function with Firebase ID Token handling
 * Automatically gets fresh token from Firebase and adds to Authorization header
 */
export async function apiCall<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    // Get current user from Firebase
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Not authenticated. Please login first.');
    }

    // Get fresh Firebase ID token
    const idToken = await user.getIdToken(true);

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
    });

    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API Error: ${response.status}`);
    }

    return data;
  } catch (error: any) {
    console.error(`❌ API Error [${endpoint}]:`, error);
    throw error;
  }
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
      throw new Error('Not authenticated. Please login first.');
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

    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'File upload failed');
    }

    return data;
  } catch (error: any) {
    console.error(`❌ Upload Error [${endpoint}]:`, error);
    throw error;
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
