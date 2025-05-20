const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const reviewRoutes = require('./routes/review.routes');
const searchRoutes = require('./routes/search.routes');

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

// Search endpoint
app.use('/api/search', searchRoutes);

// Basic health check
app.get('/', (req, res) => {
  res.send('📚 Book Review API is running');
});


module.exports = app;
