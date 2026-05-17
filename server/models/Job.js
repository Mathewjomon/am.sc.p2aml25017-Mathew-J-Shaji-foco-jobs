const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Retail', 'Food & Hospitality', 'Delivery', 'Tutoring', 'Tech', 'Events', 'Other'],
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  hoursPerWeek: {
    type: Number,
    required: true
  },
  jobType: {
    type: String,
    enum: ['Part-time', 'Gig', 'Weekend', 'Evening'],
    default: 'Part-time'
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Novelty 1 - Geospatial location
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Novelty 1 - 2dsphere index for geospatial queries
jobSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Job', jobSchema);