const { sign } = require('jsonwebtoken');
const { genSalt, compare, hash } = require('bcryptjs');

const User = require('../models/users.model');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { username, password } = req.body;

            // validate
            if (!username || !password)
                return res
                    .status(400)
                    .json({ msg: 'Not all fields have been entered.' });

            // NOTE: hardcoding admin login credentials
            if (username === 'admin') {
                const matchPassword = password === 'codeclouds';
                if (matchPassword) {
                    const token = sign(
                        { username: 'admin', role: 'admin' },
                        process.env.JWT_SECRET
                    );
                    res.cookie('token', token);
                    return res.status(200).json({
                        token,
                        user: {
                            username: 'admin',
                            role: 'admin',
                        },
                    });
                } else {
                    return res
                        .status(400)
                        .json({ msg: 'Invalid credentials.' });
                }
            }

            // NOTE: default user login
            const user = await User.findOne({ username });
            if (!user)
                return res.status(400).json({
                    msg: 'No account with this username has been registered.',
                });

            const isMatch = await compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ msg: 'Invalid credentials.' });

            const token = sign(
                { username: user.username, role: user.role },
                process.env.JWT_SECRET
            );

            res.cookie('token', token);

            return res.status(200).json({
                token,
                user: {
                    username: user.username,
                    role: user.role,
                },
            });
        } catch (error) {
            next(error);
        }
    },

    register: async (req, res, next) => {
        try {
            let { username, password } = req.body;

            if (!username || !password)
                return res
                    .status(400)
                    .json({ msg: 'Not all fields have been entered.' });

            if (password.length < 5)
                return res.status(400).json({
                    msg: 'The password needs to be at least 5 characters long.',
                });

            const existingUser = await User.findOne({ username });
            if (existingUser)
                return res.status(400).json({
                    msg: 'An account with this username already exists.',
                });

            const salt = await genSalt();
            const passwordHash = await hash(password, salt);

            const newUser = new User({
                username,
                password: passwordHash,
            });

            const savedUser = await newUser.save();

            return res.status(201).json(savedUser);
        } catch (error) {
            next(error);
        }
    },
};
