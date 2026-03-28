import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    // Firebase user identification
    firebaseUID: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    // User profile from Firebase
    name: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: '',
      maxlength: 500,
    },

    // Authentication provider info
    provider: {
      type: String,
      enum: ['google', 'github', 'email'],
      required: true,
    },
    providerData: {
      name: String,
      photoURL: String,
    },

    // User data
    role: {
      type: String,
      enum: ['creator', 'developer', 'supporter'],
      default: 'supporter',
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
    },

    // File uploads reference
    uploads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Upload',
      },
    ],

    // Visit tracking
    visits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visit',
      },
    ],

    // Account Status
    isPublic: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    // Metadata
    lastLogin: Date,
    totalVisits: {
      type: Number,
      default: 0,
    },
    settings: {
      emailNotifications: { type: Boolean, default: true },
      profileVisibility: { type: String, enum: ['public', 'private'], default: 'public' },
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ firebaseUID: 1 });
userSchema.index({ username: 1 });

// Pre-save middleware: ensure unique username
userSchema.pre('save', async function (next) {
  if (!this.isModified('username') && this.username) return next();

  if (!this.username) {
    // Generate username from email prefix if not set
    this.username = this.email.split('@')[0].toLowerCase();
  }

  next();
});

// Method to get user data without sensitive info
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  return user;
};

export default mongoose.model('User', userSchema);
