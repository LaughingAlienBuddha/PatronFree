# Patronex Backend - Production Ready

A complete Node.js + Express backend for the Patronex platform with MongoDB, JWT authentication, file uploads, and visit tracking.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Frontend Integration](#frontend-integration)
- [Database Schema](#database-schema)

## ✨ Features

- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **User Management** - Signup, login, and profile management
- ✅ **File Uploads** - Images, videos, documents with validation
- ✅ **Profile System** - User profiles with bio, pictures, and uploads
- ✅ **Visit Tracking** - Track and analyze profile visits
- ✅ **Role-based Access** - Creator, Developer, Supporter roles
- ✅ **Input Validation** - Express-validator for request validation
- ✅ **Error Handling** - Global error handling middleware
- ✅ **Rate Limiting** - Protect against brute force attacks
- ✅ **CORS Enabled** - Secure cross-origin communication
- ✅ **Security** - Helmet.js, bcrypt hashing, token verification

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Uploads**: Multer
- **Input Validation**: express-validator
- **Security**: Helmet.js, CORS, Rate Limiting
- **Logging**: Morgan

## 📁 Folder Structure

```
backend/
├── config/
│   ├── database.js           # MongoDB connection
│   └── multer.js             # File upload configuration
├── models/
│   ├── User.js               # User schema and methods
│   ├── Upload.js             # File upload schema
│   └── Visit.js              # Visit tracking schema
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── profileController.js  # Profile management logic
│   └── visitController.js    # Visit tracking logic
├── routes/
│   ├── authRoutes.js         # Auth endpoints
│   ├── profileRoutes.js      # Profile endpoints
│   └── visitRoutes.js        # Visit endpoints
├── middleware/
│   ├── auth.js               # JWT verification
│   └── errorHandler.js       # Error handling
├── utils/
│   └── responseHandler.js    # Response formatter
├── uploads/                  # Local file storage
├── server.js                 # Main server file
├── .env.example              # Environment variables template
└── package.json              # Dependencies

```

## 🚀 Installation

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (local or Atlas)

### Steps

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Update .env with your configuration**
   ```
   MONGODB_URI=mongodb://localhost:27017/patronex
   JWT_SECRET=your_super_secret_key
   PORT=5000
   ```

## ⚙️ Configuration

### Environment Variables (.env)

```env
# Database
MONGODB_URI=mongodb://localhost:27017/patronex

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000

# File Upload
MAX_FILE_SIZE=52428800
```

### MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Start MongoDB
mongod

# In another terminal, start the server
npm run dev
```

**Option 2: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in .env

## 🏃 Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. **Signup**
- **POST** `/auth/signup`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "role": "creator"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Account created successfully",
    "token": "eyJhbGc...",
    "data": {
      "userId": "123...",
      "email": "user@example.com",
      "firstName": "John",
      "role": "creator"
    }
  }
  ```

#### 2. **Login**
- **POST** `/auth/login`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: Returns token and user data (same as signup)

#### 3. **Verify Token**
- **POST** `/auth/verify-token`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Returns user data if token is valid

---

### Profile Endpoints

#### 4. **Get Public Profile**
- **GET** `/profile/public/:userId`
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "...",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "bio": "I'm a creator",
      "profilePicture": "/uploads/...",
      "role": "creator",
      "uploads": [],
      "totalVisits": 5
    }
  }
  ```

#### 5. **Get My Profile**
- **GET** `/profile/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Same as above

#### 6. **Update Profile**
- **PUT** `/profile/update`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "firstName": "Jane",
    "lastName": "Smith",
    "bio": "Updated bio",
    "role": "developer"
  }
  ```

#### 7. **Upload Profile Picture**
- **POST** `/profile/upload-picture`
- **Headers**: `Authorization: Bearer <token>`
- **Form Data**: `file` (image file)
- **Response**:
  ```json
  {
    "success": true,
    "message": "Profile picture uploaded successfully",
    "data": {
      "profilePicture": "/uploads/file-xxx.jpg"
    }
  }
  ```

#### 8. **Upload Media File**
- **POST** `/profile/upload-file`
- **Headers**: `Authorization: Bearer <token>`
- **Form Data**:
  - `file` (image, video, or document)
  - `title` (optional)
  - `description` (optional)
  - `isPublic` (true/false, default: true)
- **Response**:
  ```json
  {
    "success": true,
    "message": "File uploaded successfully",
    "data": {
      "uploadId": "...",
      "fileName": "document.pdf",
      "fileUrl": "/uploads/...",
      "fileType": "document"
    }
  }
  ```

#### 9. **Get User Uploads**
- **GET** `/profile/:userId/uploads`
- **Query**: `limit=20&skip=0` (optional)
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "...",
        "fileName": "image.jpg",
        "fileUrl": "/uploads/...",
        "fileType": "image",
        "title": "My Photo",
        "createdAt": "2024-03-29T..."
      }
    ]
  }
  ```

#### 10. **Delete Upload**
- **DELETE** `/profile/upload/:uploadId`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "success": true,
    "message": "File deleted successfully"
  }
  ```

---

### Visit Tracking Endpoints

#### 11. **Track Visit**
- **POST** `/visit/:profileUserId`
- **Headers**: `Authorization: Bearer <token>` (optional)
- **Response**:
  ```json
  {
    "success": true,
    "message": "Visit tracked",
    "data": {
      "visitId": "..."
    }
  }
  ```

#### 12. **Get Visit History**
- **GET** `/visit/:userId/history`
- **Headers**: `Authorization: Bearer <token>`
- **Query**: `limit=20&skip=0` (optional)
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "...",
        "visitorId": {
          "_id": "...",
          "firstName": "Jane",
          "profilePicture": "/uploads/..."
        },
        "createdAt": "2024-03-29T..."
      }
    ],
    "pagination": {
      "total": 100,
      "limit": 20,
      "skip": 0
    }
  }
  ```

#### 13. **Get Visit Statistics**
- **GET** `/visit/:userId/stats`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "totalVisits": 150,
      "uniqueVisitors": 45,
      "visitsLastWeek": 32,
      "topVisitors": [
        {
          "visitorId": "...",
          "count": 10,
          "visitor": { "firstName": "John" }
        }
      ]
    }
  }
  ```

---

## 🔌 Frontend Integration

### Setup API Client

Create a file `lib/api.ts` in your Next.js app:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  token?: string;
}

export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('authToken');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}
```

### Usage Examples

#### Signup
```typescript
import { apiCall } from '@/lib/api';

const response = await apiCall('/auth/signup', {
  method: 'POST',
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'creator',
  }),
});

localStorage.setItem('authToken', response.token);
```

#### Get Profile
```typescript
const profile = await apiCall('/profile/me', {
  method: 'GET',
});

console.log(profile.data);
```

#### Upload File
```typescript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('title', 'My Document');
formData.append('description', 'A description');

const response = await fetch(
  `${API_BASE_URL}/profile/upload-file`,
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    body: formData,
  }
);

const data = await response.json();
```

#### Track Profile Visit
```typescript
await apiCall(`/visit/${userId}`, {
  method: 'POST',
});
```

---

## 📊 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  profilePicture: String (URL),
  bio: String,
  role: String (creator|developer|supporter),
  uploads: [ObjectId], // References to Upload documents
  isVerified: Boolean,
  isActive: Boolean,
  lastLogin: Date,
  totalVisits: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Upload Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (Reference to User),
  fileName: String,
  fileUrl: String,
  fileSize: Number,
  mimeType: String,
  fileType: String (image|video|document),
  title: String,
  description: String,
  isPublic: Boolean,
  storageType: String (local|cloudinary),
  cloudinaryId: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Visit Collection
```javascript
{
  _id: ObjectId,
  profileUserId: ObjectId (Reference to User),
  visitorId: ObjectId (Reference to User, null if anonymous),
  ipAddress: String,
  userAgent: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Security Features

1. **Password Hashing**: Passwords are hashed using bcryptjs before storage
2. **JWT Authentication**: Secure token-based authentication
3. **Rate Limiting**: Prevents brute force attacks
4. **Input Validation**: All inputs validated with express-validator
5. **CORS**: Only allows requests from frontend
6. **Helmet**: Sets security HTTP headers
7. **File Validation**: Validates file types and sizes

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check MONGODB_URI in .env
- For MongoDB Atlas, ensure IP whitelist includes your IP

### Port Already in Use
```bash
# Change PORT in .env or kill process
lsof -i :5000
kill -9 <PID>
```

### CORS Errors
- Update FRONTEND_URL in .env
- Ensure frontend and backend URLs match

### File Upload Issues
- Check `uploads` folder exists
- Verify file size is under MAX_FILE_SIZE
- Ensure file type is allowed

---

## 📝 Next Steps

1. **Configure MongoDB** - Set up database connection
2. **Update .env** - Add your configuration
3. **Install dependencies** - Run `npm install`
4. **Start server** - Run `npm run dev`
5. **Test endpoints** - Use Postman or cURL
6. **Connect frontend** - Integrate API calls in Next.js

---

## 📄 License

MIT

---

## 👨‍💻 Support

For issues or questions, check the error logs and ensure all environment variables are correctly set.
