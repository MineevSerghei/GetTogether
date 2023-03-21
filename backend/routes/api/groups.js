const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { findNumOfMembersAndPreviewImg } = require('../../utils/objects');
const { Group, GroupImage, Membership, User, Venue } = require('../../db/models');
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors, checkIfGroupExists, isOrganizer, isOrganizerOrCoHost } = require('../../utils/validation');

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

const validateVenue = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('lat')
        .exists({ checkNull: true })
        .notEmpty()
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkNull: true })
        .notEmpty()
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude is not valid'),
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

router.put('/:groupId', requireAuth, checkIfGroupExists, isOrganizer, validateGroup, async (req, res) => {

    const group = req.group;

    const { name, about, type, private, city, state } = req.body;

    group.name = name;
    group.about = about;
    group.type = type;
    group.private = private;
    group.city = city;
    group.state = state;

    await group.save();

    return res.json(group);

});

router.delete('/:groupId', requireAuth, checkIfGroupExists, isOrganizer, async (req, res) => {

    await req.group.destroy();

    return res.json({
        "message": "Successfully deleted",
    });

});


// Get all Venues for a Group specified by id

router.get('/:groupId/venues', requireAuth, checkIfGroupExists, isOrganizerOrCoHost, async (req, res) => {

    const venues = await Venue.findAll({
        attributes: ['id', 'groupId', 'address', 'city', 'state', 'lat', 'lng'],
        where: {
            groupId: req.params.groupId
        }
    });

    return res.json(venues);

});


// Create a new Venue for a Group specified by its id

router.post('/:groupId/venues', requireAuth, checkIfGroupExists, isOrganizerOrCoHost, validateVenue, async (req, res) => {

    const { address, city, state, lat, lng } = req.body;

    const venue = await req.group.createVenue({ address, city, state, lat, lng });

    const pojoVenue = venue.toJSON();

    delete pojoVenue.createdAt;
    delete pojoVenue.updatedAt;

    return res.json(pojoVenue);

});


module.exports = router;
