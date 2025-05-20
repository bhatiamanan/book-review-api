const express = require('express');
const router = express.Router();
const { addReview, updateReview, deleteReview } = require('../controllers/review.controller');
const authenticate = require('../middleware/auth.middleware');

// Review routes
router.post('/:id/reviews', authenticate, addReview);
router.put('/:id', authenticate, updateReview);
router.delete('/:id', authenticate, deleteReview);

module.exports = router;
