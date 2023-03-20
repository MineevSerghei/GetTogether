const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { findNumOfMembersAndPreviewImg } = require('../../utils/objects');
const { Group, GroupImage, Membership, User } = require('../../db/models');
const { Op } = require('sequelize');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all Groups
router.get('/', async (req, res) => {

    const groups = await Group.findAll({
        include: {
            model: GroupImage,
            attributes: ['url'],
            where: {
                preview: true
            },
            required: false,
            limit: 1
        }
    });

    const groupsRes = await findNumOfMembersAndPreviewImg(groups);

    return res.json(groupsRes);
});

router.get('/current', requireAuth, async (req, res) => {

    const groups = await Group.findAll({
        where: {
            [Op.or]: [
                {
                    organizerId: req.user.id
                },
                {
                    '$Memberships.userId$': req.user.id,
                    '$Memberships.status$': { [Op.ne]: 'pending' }
                }
            ]
        },
        include: [{
            model: Membership,
            attributes: []
        },
        {
            model: GroupImage,
            attributes: ['url'],
            where: {
                preview: true
            },
            required: false,
            limit: 1
        }]
    });

    const groupsRes = await findNumOfMembersAndPreviewImg(groups);

    return res.json(groupsRes);
});









module.exports = router;
