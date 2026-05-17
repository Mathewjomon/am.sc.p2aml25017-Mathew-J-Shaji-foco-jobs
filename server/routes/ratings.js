const express = require('express');
const router = express.Router();
const Rating = require('../models/Rating');
const User = require('../models/User');
const Application = require('../models/Application');
const auth = require('../middleware/auth');

// Submit a rating (after job completed)
router.post('/:userId', auth, async (req, res) => {
  try {
    const { score, comment, jobId } = req.body;

    // Can't rate yourself
    if (req.user.id === req.params.userId) {
      return res.status(400).json({ message: 'You cannot rate yourself' });
    }

    // Check if already rated for this job
    const existing = await Rating.findOne({
      from: req.user.id,
      to: req.params.userId,
      job: jobId
    });
    if (existing) {
      return res.status(400).json({ message: 'You have already rated this person for this job' });
    }

    // Create rating
    const rating = new Rating({
      from: req.user.id,
      to: req.params.userId,
      job: jobId,
      score,
      comment
    });

    await rating.save();

    // Novelty 4 - Recalculate average rating for the user
    const allRatings = await Rating.find({ to: req.params.userId });
    const avg = allRatings.reduce((sum, r) => sum + r.score, 0) / allRatings.length;

    await User.findByIdAndUpdate(req.params.userId, {
      avgRating: parseFloat(avg.toFixed(1)),
      ratingCount: allRatings.length
    });

    res.status(201).json({ message: 'Rating submitted successfully', rating });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get ratings for a user
router.get('/:userId', async (req, res) => {
  try {
    const ratings = await Rating.find({ to: req.params.userId })
      .populate('from', 'name role')
      .populate('job', 'title')
      .sort({ createdAt: -1 });

    res.json(ratings);

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;