import Visit from '../models/Visit.js';
import User from '../models/User.js';

/**
 * POST /api/visit/:userId
 * Track a visit to a user's profile
 */
export const trackVisit = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify profile user exists
    const profileUser = await User.findById(userId);
    if (!profileUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Create visit record
    const visit = new Visit({
      profileUserId: userId,
      visitorId: req.user._id, // Current authenticated user
      visitorName: req.user.name,
      visitorEmail: req.user.email,
    });

    await visit.save();

    // Increment total visits counter
    await User.findByIdAndUpdate(userId, {
      $inc: { totalVisits: 1 },
      $push: { visits: visit._id },
    });

    res.status(201).json({
      success: true,
      message: 'Visit tracked successfully',
      data: {
        visitId: visit._id,
        timestamp: visit.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error tracking visit',
      error: error.message,
    });
  }
};

/**
 * GET /api/visit/:userId/history
 * Get visit history for a profile (only owner can view)
 */
export const getVisitHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 20, skip = 0 } = req.query;

    // Verify ownership
    if (userId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only view your own visit history',
      });
    }

    const visits = await Visit.find({ profileUserId: userId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .select('visitorId visitorName visitorEmail createdAt');

    const totalVisits = await Visit.countDocuments({ profileUserId: userId });

    res.status(200).json({
      success: true,
      count: visits.length,
      total: totalVisits,
      data: visits,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching visit history',
      error: error.message,
    });
  }
};

/**
 * GET /api/visit/:userId/stats
 * Get visit statistics (only owner can view)
 */
export const getVisitStats = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify ownership
    if (userId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only view your own statistics',
      });
    }

    // Get all visits
    const totalVisits = await Visit.countDocuments({ profileUserId: userId });

    // Get unique visitors
    const uniqueVisitors = await Visit.distinct('visitorId', {
      profileUserId: userId,
    });

    // Get visits in last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const visitsLastWeek = await Visit.countDocuments({
      profileUserId: userId,
      createdAt: { $gte: sevenDaysAgo },
    });

    // Get visits in last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const visitsLastMonth = await Visit.countDocuments({
      profileUserId: userId,
      createdAt: { $gte: thirtyDaysAgo },
    });

    // Get top 5 visitors
    const topVisitors = await Visit.aggregate([
      { $match: { profileUserId: userId } },
      { $group: { _id: '$visitorId', count: { $sum: 1 }, name: { $first: '$visitorName' } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // Get daily visit counts for last 7 days
    const dailyVisits = await Visit.aggregate([
      {
        $match: {
          profileUserId: userId,
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalVisits,
        uniqueVisitors: uniqueVisitors.length,
        visitsLastWeek,
        visitsLastMonth,
        topVisitors: topVisitors.map((v) => ({
          visitorId: v._id,
          visitorName: v.name,
          count: v.count,
        })),
        dailyVisits,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching visit statistics',
      error: error.message,
    });
  }
};
