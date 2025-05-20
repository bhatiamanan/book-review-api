const Book = require('../models/book.model');
const Review = require('../models/review.model');

const createBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const book = await Book.create({
      title,
      author,
      genre,
      createdBy: req.user.userId,
    });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create book', error: err.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = new RegExp(genre, 'i');

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get books', error: err.message });
  }
};

const getBookDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 5 } = req.query;

    const book = await Book.findById(id).lean();
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Reviews and average rating
    const reviews = await Review.find({ bookId: id })
      .populate('userId', 'username')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();

    const avgResult = await Review.aggregate([
      { $match: { bookId: book._id } },
      { $group: { _id: '$bookId', avgRating: { $avg: '$rating' } } },
    ]);

    const averageRating = avgResult.length ? avgResult[0].avgRating : null;

    res.status(200).json({ ...book, averageRating, reviews });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching book details', error: err.message });
  }
};


module.exports = { createBook, getBooks, getBookDetails };
