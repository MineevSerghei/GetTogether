const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = User.build({ email, username, hashedPassword });

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    await user.save();

    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
    };

    if (user.firstName) safeUser.firstName = user.firstName;
    if (user.lastName) safeUser.lastName = user.lastName;

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
}
);

module.exports = router;
