const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { findNumOfMembersAndPreviewImg } = require('../../utils/objects');
const { Group, GroupImage, Membership, User, Venue } = require('../../db/models');
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors, checkIfGroupExists, isOrganizer } = require('../../utils/validation');

const router = express.Router();

const validateGroup = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 60, min: 5 })
        .withMessage('Name must be between 5 and 60 characters'),
    check('about')
        .exists({ checkFalsy: true })
        .isLength({ min: 50 })
        .withMessage('About must be 50 characters or more'),
    check('type')
        .exists({ checkFalsy: true })
        .isIn(['Online', 'In person'])
        .withMessage("Type must be 'Online' or 'In person'"),
    check('private')
        .exists()
        .isBoolean()
        .withMessage('Private must be a boolean'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    handleValidationErrors
];

const validateImage = [
    check('url')
        .exists({ checkFalsy: true })
        .isURL()
        .withMessage('Valid URL is required'),
    check('preview')
        .exists()
        .isBoolean()
        .withMessage('Preview must be a boolean'),
    handleValidationErrors
];

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

router.post('/', requireAuth, validateGroup, async (req, res) => {
    const { name, about, type, private, city, state } = req.body;

    const group = await Group.create({
        organizerId: req.user.id,
        name,
        about,
        type,
        private,
        city,
        state,
    });

    res.status(201);
    return res.json(group);
});

router.post('/:groupId/images', requireAuth, checkIfGroupExists, isOrganizer, validateImage, async (req, res) => {

    const image = await req.group.createGroupImage({
        url: req.body.url,
        preview: req.body.preview
    });

    const { id, url, preview } = image.toJSON();

    return res.json({ id, url, preview });

});




module.exports = router;
