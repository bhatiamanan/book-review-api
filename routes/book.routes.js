const express = require('express');
const router = express.Router();
const { createBook, getBooks } = require('../controllers/book.controller');
const authenticate = require('../middleware/auth.middleware');

router.post('/', authenticate, createBook);
router.get('/', getBooks);

module.exports = router;
