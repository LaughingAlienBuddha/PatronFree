# Backend Integration Guide for Patronex Frontend

Complete guide to integrate the Patronex backend with your Next.js frontend.

## 📋 Table of Contents

1. [Setup](#setup)
2. [Authentication Integration](#authentication-integration)
3. [Profile Management](#profile-management)
4. [File Uploads](#file-uploads)
5. [Visit Tracking](#visit-tracking)
6. [Complete Code Examples](#complete-code-examples)

---

## Setup

### 1. Environment Variables

Add to your `.env.local` in the Next.js app:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 2. API Client Already Created

The file `lib/api-client.ts` is ready to use:

```typescript
import { apiCall, uploadFile, setAuthToken, getAuthToken } from '@/lib/api-client';
```

---

## Authentication Integration

### 1. Update Signup Page

Replace the signup button handler in `app/signup/page.tsx`:

```typescript
import { apiCall, setAuthToken } from '@/lib/api-client';

// In the form submission handler:
const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        role: selectedRole,
      }),
    });

    if (response.success) {
      // Store token
      setAuthToken(response.token!);
      
      // Redirect to dashboard
      router.push('/dashboard');
    }
  } catch (error: any) {
    setError(error.message);
  }
};
```

### 2. Update Login Page

Replace the login button handler in `app/signin/page.tsx`:

```typescript
import { apiCall, setAuthToken } from '@/lib/api-client';

// In the form submission handler:
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.success) {
      setAuthToken(response.token!);
      router.push('/dashboard');
    }
  } catch (error: any) {
    setError(error.message);
  }
};
```

### 3. Update Google/GitHub Login

In `app/signin/page.tsx` and `app/signup/page.tsx`, after successful popup auth:

```typescript
import { signInWithPopup } from 'firebase/auth';
import { apiCall, setAuthToken } from '@/lib/api-client';

const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    if (result?.user) {
      // Get Firebase ID token
      const token = await result.user.getIdToken();
      
      // Create account in backend if new user
      const response = await apiCall('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          email: result.user.email,
          password: token, // Use Firebase token as password
          firstName: result.user.displayName || 'User',
          lastName: '',
        }),
      });

      if (response.success || response.message.includes('already')) {
        // If user exists, just login
        const loginResponse = await apiCall('/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email: result.user.email,
            password: token,
          }),
        });

        setAuthToken(loginResponse.token!);
        router.push('/dashboard');
      }
    }
  } catch (error: any) {
    setError(error.message);
  }
};
```

---

## Profile Management

### 1. Fetch Current User Profile

Create a hook `hooks/useProfile.ts`:

```typescript
import { useEffect, useState } from 'react';
import { apiCall } from '@/lib/api-client';

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  bio: string;
  role: 'creator' | 'developer' | 'supporter';
  uploads: any[];
  totalVisits: number;
  createdAt: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiCall<UserProfile>('/profile/me');
        setProfile(response.data || null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error, setProfile };
}
```

### 2. Use in Profile Page

In `app/dashboard/page.tsx` or `app/profile/page.tsx`:

```typescript
import { useProfile } from '@/hooks/useProfile';

export default function ProfilePage() {
  const { profile, loading, error } = useProfile();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{profile?.firstName} {profile?.lastName}</h1>
      <p>{profile?.bio}</p>
      <p>Role: {profile?.role}</p>
      <p>Total Visits: {profile?.totalVisits}</p>
    </div>
  );
}
```

### 3. Update Profile

```typescript
import { apiCall } from '@/lib/api-client';

const handleUpdateProfile = async () => {
  try {
    const response = await apiCall('/profile/update', {
      method: 'PUT',
      body: JSON.stringify({
        firstName: 'Jane',
        lastName: 'Smith',
        bio: 'Updated bio',
        role: 'creator',
      }),
    });

    if (response.success) {
      console.log('Profile updated:', response.data);
      // Update local state or refetch profile
    }
  } catch (error: any) {
    console.error('Update failed:', error.message);
  }
};
```

---

## File Uploads

### 1. Upload Profile Picture

```typescript
import { uploadFile } from '@/lib/api-client';

const handleProfilePictureUpload = async (file: File) => {
  try {
    const response = await uploadFile('/profile/upload-picture', file);

    if (response.success) {
      console.log('Picture uploaded:', response.data.profilePicture);
      // Update profile picture in UI
    }
  } catch (error: any) {
    console.error('Upload failed:', error.message);
  }
};
```

### 2. Upload Media Files

```typescript
import { uploadFile } from '@/lib/api-client';

const handleMediaUpload = async (file: File, title: string, description: string) => {
  try {
    const response = await uploadFile(
      '/profile/upload-file',
      file,
      {
        title,
        description,
        isPublic: true,
      }
    );

    if (response.success) {
      console.log('File uploaded:', response.data);
      // Add to uploads list
    }
  } catch (error: any) {
    console.error('Upload failed:', error.message);
  }
};
```

### 3. Get User Uploads

```typescript
import { useEffect, useState } from 'react';
import { apiCall } from '@/lib/api-client';

export function UserUploads({ userId }: { userId: string }) {
  const [uploads, setUploads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await apiCall(`/profile/${userId}/uploads`);
        setUploads(response.data || []);
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, [userId]);

  return (
    <div>
      {uploads.map((upload) => (
        <div key={upload._id}>
          {upload.fileType === 'image' && <img src={upload.fileUrl} alt={upload.title} />}
          {upload.fileType === 'video' && <video src={upload.fileUrl} controls />}
          {upload.fileType === 'document' && <a href={upload.fileUrl}>{upload.fileName}</a>}
        </div>
      ))}
    </div>
  );
}
```

### 4. Delete Upload

```typescript
import { apiCall } from '@/lib/api-client';

const handleDeleteUpload = async (uploadId: string) => {
  try {
    const response = await apiCall(`/profile/upload/${uploadId}`, {
      method: 'DELETE',
    });

    if (response.success) {
      console.log('File deleted');
      // Remove from uploads list
    }
  } catch (error: any) {
    console.error('Delete failed:', error.message);
  }
};
```

---

## Visit Tracking

### 1. Track Profile Visit

Track when someone visits a profile:

```typescript
import { apiCall } from '@/lib/api-client';

export function trackProfileVisit(profileUserId: string) {
  apiCall(`/visit/${profileUserId}`, {
    method: 'POST',
  }).catch((error) => {
    console.error('Failed to track visit:', error);
  });
}

// Use in profile page useEffect:
useEffect(() => {
  trackProfileVisit(profileUserId);
}, [profileUserId]);
```

### 2. Get Visit History

```typescript
import { useEffect, useState } from 'react';
import { apiCall } from '@/lib/api-client';

export function VisitHistory({ userId }: { userId: string }) {
  const [visits, setVisits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await apiCall(`/visit/${userId}/history?limit=20`);
        setVisits(response.data || []);
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, [userId]);

  return (
    <div>
      {visits.map((visit) => (
        <div key={visit._id}>
          {visit.visitorId ? (
            <span>{visit.visitorId.firstName} visited</span>
          ) : (
            <span>Anonymous visit</span>
          )}
          <span> - {new Date(visit.createdAt).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  );
}
```

### 3. Get Visit Statistics

```typescript
import { useEffect, useState } from 'react';
import { apiCall } from '@/lib/api-client';

export function VisitStats({ userId }: { userId: string }) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiCall(`/visit/${userId}/stats`);
        setStats(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <p>Total Visits: {stats?.totalVisits}</p>
      <p>Unique Visitors: {stats?.uniqueVisitors}</p>
      <p>Visits Last Week: {stats?.visitsLastWeek}</p>
      
      <h3>Top Visitors</h3>
      {stats?.topVisitors.map((visitor: any) => (
        <div key={visitor.visitorId}>
          {visitor.visitor?.firstName} - {visitor.count} visits
        </div>
      ))}
    </div>
  );
}
```

---

## Complete Code Examples

### Full Signup Component

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiCall, setAuthToken } from '@/lib/api-client';

export default function SignUpComponent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [role, setRole] = useState('supporter');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiCall('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          role,
        }),
      });

      if (response.success && response.token) {
        setAuthToken(response.token);
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="supporter">Supporter</option>
        <option value="creator">Creator</option>
        <option value="developer">Developer</option>
      </select>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating Account...' : 'Sign Up'}
      </button>
    </form>
  );
}
```

### Full Dashboard Component

```typescript
'use client';

import { useProfile } from '@/hooks/useProfile';
import { VisitStats } from '@/components/VisitStats';
import { UserUploads } from '@/components/UserUploads';
import { getAuthToken } from '@/lib/api-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const { profile, loading, error } = useProfile();

  useEffect(() => {
    // Redirect to signin if not authenticated
    if (!getAuthToken()) {
      router.push('/signin');
    }
  }, [router]);

  if (!profile) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome, {profile.firstName}!</h1>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Profile Information</h2>
        <p>Email: {profile.email}</p>
        <p>Role: {profile.role}</p>
        <p>Bio: {profile.bio}</p>
        {profile.profilePicture && (
          <img src={profile.profilePicture} alt="Profile" style={{ width: '100px' }} />
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Your Uploads</h2>
        <UserUploads userId={profile._id} />
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Visit Statistics</h2>
        <VisitStats userId={profile._id} />
      </div>
    </div>
  );
}
```

---

## Testing the Integration

### 1. Start Backend
```bash
cd backend
npm run dev
```

### 2. Test Endpoints with Postman

1. **Signup**: POST http://localhost:5000/api/auth/signup
2. **Login**: POST http://localhost:5000/api/auth/login
3. **Get Profile**: GET http://localhost:5000/api/profile/me (with token)
4. **Upload File**: POST http://localhost:5000/api/profile/upload-file (with token)

### 3. Test in Frontend

- Navigate to `/signup` and create account
- Verify token is stored in localStorage
- Check if redirect to dashboard works
- Test profile update
- Test file upload

---

## Troubleshooting

### CORS Errors
- Ensure `NEXT_PUBLIC_API_URL` points to correct backend
- Check `.env` in backend has correct `FRONTEND_URL`

### 401 Unauthorized
- Verify token is being sent in Authorization header
- Check token expiration
- Try logging in again

### File Upload Failed
- Check file size (max 50MB)
- Verify file type is allowed
- Ensure form data is sent correctly

### API Call Returns 404
- Verify endpoint path is correct
- Check backend is running
- Review backend logs for errors

---

## Next Steps

1. ✅ Backend is set up and running
2. ✅ API client is ready (`lib/api-client.ts`)
3. 📝 Create hooks for data fetching
4. 📝 Update all form submissions to use API
5. 📝 Add error handling and loading states
6. 📝 Test all flows end-to-end
7. 📝 Deploy backend to production

---

**Happy coding! 🚀**
