const express = require('express');
const router = express.Router();
const { searchBooks } = require('../controllers/search.controller');

// Search route
router.get('/', searchBooks);

module.exports = router;
