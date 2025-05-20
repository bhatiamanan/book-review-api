const Book = require('../models/book.model');

// Search for books by title or author, case-insensitive
const searchBooks = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Query string is required' });
    }

    const regex = new RegExp(query, 'i');
    const results = await Book.find({
      $or: [{ title: regex }, { author: regex }],
    });

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
};

module.exports = { searchBooks };
