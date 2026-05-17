const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// Get all jobs (with optional geolocation and filters)
router.get('/', async (req, res) => {
  try {
    const { lat, lng, radius, city, category } = req.query;

    let query = { isActive: true };

    // Novelty 1 - Geospatial filter
    if (lat && lng) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius) || 10000
        }
      };
    }

    // City filter
    if (city && city !== 'all') {
      query.city = city;
    }

    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }

    const jobs = await Job.find(query)
      .populate('employer', 'name avgRating ratingCount')
      .sort({ createdAt: -1 });

    res.json(jobs);

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('employer', 'name avgRating ratingCount city');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Post a job (employer only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'employer') {
      return res.status(403).json({ message: 'Only employers can post jobs' });
    }

    const {
      title, description, company, city,
      category, salary, hoursPerWeek,
      jobType, coordinates
    } = req.body;

    const job = new Job({
      title,
      description,
      company,
      city,
      category,
      salary,
      hoursPerWeek,
      jobType,
      employer: req.user.id,
      // Novelty 1 - Store coordinates
      location: {
        type: 'Point',
        coordinates: coordinates || [0, 0]
      }
    });

    await job.save();
    res.status(201).json(job);

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update a job (employer only)
router.put('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updated = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete a job (employer only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;