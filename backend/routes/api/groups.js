const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { findNumOfMembersAndPreviewImg } = require('../../utils/objects');
const { Group, GroupImage, Membership, User, Venue } = require('../../db/models');
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

router.get('/:groupId', async (req, res) => {
    const groupInstanceObj = await Group.findByPk(req.params.groupId, {
        include: [
            {
                model: GroupImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                as: 'Organizer',
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Venue,
                attributes: ['id', 'groupId', 'address', 'city', 'state', 'lat', 'lng']
            }
        ]
    });

    if (!groupInstanceObj) {
        res.status(404);
        return res.json({
            "message": "Group couldn't be found",
        });
    }

    const group = groupInstanceObj.toJSON();

    // Getting the number of members of each group
    group.numMembers = await Membership.count({
        where: {
            groupId: group.id,
            status: { [Op.ne]: 'pending' }
        }
    });

    return res.json(group);
});







module.exports = router;
