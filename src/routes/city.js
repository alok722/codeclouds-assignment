const { Router } = require('express');

const { add, check } = require('../controllers/city');
const { isAdmin } = require('../middleware/index');

const router = Router();

// Serving static template
router.get('/profile', (req, res) => {
    res.render('pages/city', { role: req.user.username });
})

// API routes
router.get('/check/:cityName', check);
// isAdmin middleware to ensure logged in client is ADMIN
router.post('/add', isAdmin, add);

module.exports = router;
