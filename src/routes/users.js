const { Router } = require('express');

const { login, register } = require('../controllers/users');

const router = Router();

// Serving static template
router.get('/login-page', (req, res) => {
    res.render('pages/authenticate', { pageName: 'login' });
})
router.get('/register-page', (req, res) => {
    res.render('pages/authenticate', { pageName: 'register' });
})

// API routes
router.post('/register', register);
router.post('/login', login);
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/api');
})

module.exports = router;
