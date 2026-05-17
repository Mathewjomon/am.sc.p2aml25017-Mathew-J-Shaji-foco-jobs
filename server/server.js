require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/ratings', require('./routes/ratings'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'PartWork Kerala API is running!' });
});

// Connect to MongoDB and start server
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

console.log('Connecting to MongoDB:', MONGO_URI);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err.message);
  });