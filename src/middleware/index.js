const { verify } = require("jsonwebtoken");
const User = require('../models/users.model');

module.exports = {
    auth: (req, res, next) => {
        try {

            // let token = req.headers.authorization;
            const token = req.cookies['token'];
            if (!token)
                // return res.status(401).json({ msg: "NO authentication token, access denied" });
                return res.redirect('/api/users/login-page');

            const verified = verify(token, process.env.JWT_SECRET); // process.env.JWT_SECRET
            if (!verified)
                // return res.status(401).json({
                //     msg: "Token verification failed, authorization denied",
                // });
                return res.redirect('/api/users/login-page');
            req.user = verified;
            next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    isAdmin: async (req, res, next) => {
        try {
            if (req.user.username === 'admin') {
                next();
            } else {
                return res.status(401).json({
                    msg: "You are not authorized to tamper the default city",
                });
            }
        } catch (error) {
            res.status(500).json({ error: err.message });
        }
    },

};
