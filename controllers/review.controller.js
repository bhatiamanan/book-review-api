const Review = require('../models/review.model');

// Add a review for a book
const addReview = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.userId;

    // Check if user already reviewed this book
    // Optionally, this logic can be enforced at the database level 
    // by adding a compound unique index on { bookId, userId } in the Review schema:
    // reviewSchema.index({ bookId: 1, userId: 1 }, { unique: true });
    const existingReview = await Review.findOne({ bookId, userId });
    if (existingReview)
      return res.status(400).json({ message: 'You already reviewed this book' });

    const review = await Review.create({ bookId, userId, rating, comment });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add review', error: err.message });
  }
};

// Update a review
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId.toString() !== userId)
      return res.status(403).json({ message: 'Unauthorized to update this review' });

    const { rating, comment } = req.body;

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();

    res.status(200).json({ message: 'Review updated', review });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update review', error: err.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId.toString() !== userId)
      return res.status(403).json({ message: 'Unauthorized to delete this review' });

    await review.deleteOne();
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete review', error: err.message });
  }
};

module.exports = { addReview, updateReview, deleteReview };
