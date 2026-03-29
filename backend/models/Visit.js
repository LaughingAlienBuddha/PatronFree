import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema(
  {
    // Profile visited
    profileUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // Visitor information
    visitorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // Visitor details (from Firebase user)
    visitorName: {
      type: String,
      required: true,
    },
    visitorEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
visitSchema.index({ profileUserId: 1, createdAt: -1 });
visitSchema.index({ visitorId: 1, createdAt: -1 });
visitSchema.index({ profileUserId: 1, visitorId: 1 });

export default mongoose.model('Visit', visitSchema);
