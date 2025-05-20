const express = require('express');
const router = express.Router();
const { createBook, getBooks, getBookDetails } = require('../controllers/book.controller');
const { addReview } = require('../controllers/review.controller');
const authenticate = require('../middleware/auth.middleware');

// Book routes
router.post('/', authenticate, createBook);
router.get('/', getBooks);
router.get('/:id', getBookDetails);

// ⬇️ Add review route under /books/:id/reviews
router.post('/:id/reviews', authenticate, addReview);

module.exports = router;
