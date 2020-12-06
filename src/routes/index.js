const { Router } = require('express');

const { auth } = require('../middleware/index');

const router = Router();

// Serving static template
router.get('/', (req, res) => res.render('pages/home.ejs'));

// API routes
router.use('/users', require('./users'));
// auth middleware to ensure that only loggedin user can access this route
router.use('/city', auth, require('./city'));

module.exports = router;
