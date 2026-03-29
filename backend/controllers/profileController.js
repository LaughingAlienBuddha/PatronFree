import User from '../models/User.js';
import Upload from '../models/Upload.js';

/**
 * GET /api/profile
 * Get current authenticated user's profile
 */
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('uploads', 'fileName fileUrl fileType uploadedAt description')
      .select('-settings');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Return clean user profile data
    res.status(200).json({
      success: true,
      data: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        username: user.username,
        bio: user.bio,
        provider: user.provider,
        role: user.role,
        isPublic: user.isPublic,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message,
    });
  }
};

/**
 * GET /api/profile/:userId
 * Get public profile of any user
 */
export const getPublicProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .populate('uploads', 'fileName fileUrl fileType uploadedAt description');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if profile is public
    if (!user.isPublic && user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'This profile is private',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message,
    });
  }
};

/**
 * PUT /api/profile
 * Update current user's profile
 * Note: name comes from Firebase and cannot be changed here
 */
export const updateProfile = async (req, res) => {
  try {
    const { bio, role, isPublic } = req.body;

    const updateData = {};

    if (bio !== undefined) {
      updateData.bio = bio.substring(0, 500); // Max 500 chars
    }

    if (role && ['creator', 'developer', 'supporter'].includes(role)) {
      updateData.role = role;
    }

    if (isPublic !== undefined) {
      updateData.isPublic = isPublic;
    }

    const user = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message,
    });
  }
};

/**
 * POST /api/profile/upload-picture
 * Update profile picture (receives image URL)
 */
export const uploadProfilePicture = async (req, res) => {
  try {
    const { pictureUrl } = req.body;

    if (!pictureUrl) {
      return res.status(400).json({
        success: false,
        message: 'Picture URL is required',
      });
    }

    // Validate URL format
    try {
      new URL(pictureUrl);
    } catch {
      return res.status(400).json({
        success: false,
        message: 'Invalid picture URL',
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profilePic: pictureUrl },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile picture updated successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile picture',
      error: error.message,
    });
  }
};

/**
 * POST /api/profile/upload-file
 * Upload file (receives file metadata and URL)
 */
export const uploadFile = async (req, res) => {
  try {
    const { fileUrl, fileName, fileType, description } = req.body;

    if (!fileUrl || !fileName) {
      return res.status(400).json({
        success: false,
        message: 'fileUrl and fileName are required',
      });
    }

    // Validate file type
    const validFileTypes = ['image', 'video', 'document', 'other'];
    const type = validFileTypes.includes(fileType) ? fileType : 'other';

    // Validate URL
    try {
      new URL(fileUrl);
    } catch {
      return res.status(400).json({
        success: false,
        message: 'Invalid file URL',
      });
    }

    const upload = new Upload({
      userId: req.user._id,
      fileName: fileName.substring(0, 255),
      fileUrl,
      fileType: type,
      description: description ? description.substring(0, 500) : '',
    });

    await upload.save();

    // Link upload to user
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { uploads: upload._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: upload,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading file',
      error: error.message,
    });
  }
};

/**
 * GET /api/profile/:userId/uploads
 * Get all public uploads of a user
 */
export const getUserUploads = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const uploads = await Upload.find({ userId })
      .sort({ uploadedAt: -1 })
      .select('fileName fileUrl fileType description uploadedAt');

    res.status(200).json({
      success: true,
      count: uploads.length,
      data: uploads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching uploads',
      error: error.message,
    });
  }
};

/**
 * DELETE /api/profile/upload/:uploadId
 * Delete an upload
 */
export const deleteUpload = async (req, res) => {
  try {
    const { uploadId } = req.params;

    const upload = await Upload.findById(uploadId);

    if (!upload) {
      return res.status(404).json({
        success: false,
        message: 'Upload not found',
      });
    }

    // Verify ownership
    if (upload.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own uploads',
      });
    }

    await Upload.findByIdAndDelete(uploadId);

    // Remove from user's uploads array
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { uploads: uploadId },
    });

    res.status(200).json({
      success: true,
      message: 'Upload deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting upload',
      error: error.message,
    });
  }
};
