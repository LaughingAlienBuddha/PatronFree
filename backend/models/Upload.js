import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema(
  {
    // File Information
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    
    // File Classification
    fileType: {
      type: String,
      enum: ['image', 'video', 'document'],
      required: true,
    },
    
    // Metadata
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    
    // File Location (local or cloud)
    storageType: {
      type: String,
      enum: ['local', 'cloudinary'],
      default: 'local',
    },
    cloudinaryId: {
      type: String, // Cloudinary public_id for deletion
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Upload', uploadSchema);
