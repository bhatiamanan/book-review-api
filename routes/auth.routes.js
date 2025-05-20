const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth.controller');

router.post('/signup', signup);
router.post('/login', login);

router.get('/test', (req, res) => {
    res.send('Auth route is working');
  });


module.exports = router;
