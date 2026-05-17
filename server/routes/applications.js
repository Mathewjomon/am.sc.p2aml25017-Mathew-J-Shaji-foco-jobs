const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const auth = require('../middleware/auth');

function calculateSkillGap(jobDescription, seekerSkills) {
  const stopwords = ['the', 'and', 'for', 'with', 'a', 'an', 'to', 'of', 'in', 'is', 'we', 'are', 'you', 'will', 'be', 'have'];

  function getKeywords(text) {
    return text.toLowerCase().split(/\W+/).filter(w => w.length > 2 && !stopwords.includes(w));
  }

  const jobWords = new Set(getKeywords(jobDescription));
  const seekerWords = new Set(getKeywords(seekerSkills));
  const matched = [...jobWords].filter(w => seekerWords.has(w));
  const missing = [...jobWords].filter(w => !seekerWords.has(w));
  const score = jobWords.size > 0 ? Math.round((matched.length / jobWords.size) * 100) : 0;

  return { score, missingSkills: missing.slice(0, 5) };
}

router.post('/:jobId', auth, async (req, res) => {
  try {
    if (req.user.role !== 'seeker') {
      return res.status(403).json({ message: 'Only job seekers can apply' });
    }

    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const existing = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user.id
    });
    if (existing) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const seeker = await User.findById(req.user.id);
    const { score, missingSkills } = calculateSkillGap(
      job.description,
      seeker.skills || ''
    );

    const application = new Application({
      job: req.params.jobId,
      applicant: req.user.id,
      coverLetter: req.body.coverLetter || '',
      skillGapScore: score,
      missingSkills
    });

    await application.save();
    res.status(201).json(application);

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/my/applications', auth, async (req, res) => {
  try {
    if (req.user.role !== 'seeker') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const applications = await Application.find({ applicant: req.user.id })
      .populate('job', 'title company city salary employer')
      .sort({ appliedAt: -1 });

    res.json(applications);

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/job/:jobId', auth, async (req, res) => {
  try {
    if (req.user.role !== 'employer') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email city phone skills avgRating ratingCount')
      .sort({ appliedAt: -1 });

    res.json(applications);

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.patch('/:id/status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'employer') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('applicant', 'name email');

    res.json(application);

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;