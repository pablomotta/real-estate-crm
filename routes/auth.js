const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const db = require('../models');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
    const id = req.user.id;
    try {
        const user = await db.User.findOne({
            where: { id },
            include: [db.Contacts]
        });
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post(
    '/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        console.log(email, password);
        try {
            let user = await db.User.findOne({
                where: {
                    email
                }
            });
            console.log(user);
            if (!user) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            console.log('isMatch', isMatch);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const payload = {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
