const express = require('express');
const router = express.Router();
const { addReview, updateReview, deleteReview } = require('../controllers/review.controller');
const authenticate = require('../middleware/auth.middleware');

// POST /books/:id/reviews → route mounted via /api/books
router.post('/:id/reviews', authenticate, addReview);

// PUT /reviews/:id
router.put('/:id', authenticate, updateReview);

// DELETE /reviews/:id
router.delete('/:id', authenticate, deleteReview);

module.exports = router;
