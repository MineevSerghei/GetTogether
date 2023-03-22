const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { findNumOfMembersAndPreviewImg, findNumOfAttendeesAndPreviewImg } = require('../../utils/objects');
const { Group, GroupImage, Membership, User, Venue, Event, EventImage } = require('../../db/models');
const { Op } = require('sequelize');
const { isOrganizer, isOrganizerOrCoHost } = require('../../utils/roles');
// const { run } = require('express-validator');

const { checkIfGroupExists,
    validateVenue,
    validateGroup,
    validateImage,
    validateEvent } = require('../../utils/validation');

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

    return res.json({ Groups: groupsRes });
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

    return res.json({ Groups: groupsRes });
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
        where: {
            groupId: req.params.groupId
        }
    });

    return res.json({ Venues: venues });

});

// Create a new Venue for a Group specified by its id

router.post('/:groupId/venues', requireAuth, checkIfGroupExists, isOrganizerOrCoHost, validateVenue, async (req, res) => {

    const { address, city, state, lat, lng } = req.body;

    const venue = await req.group.createVenue({ address, city, state, lat, lng });

    delete venue.dataValues.createdAt;
    delete venue.dataValues.updatedAt;

    return res.json(venue);

});

router.get('/:groupId/events', checkIfGroupExists, async (req, res) => {
    const events = await Event.findAll({
        where: {
            groupId: req.group.id
        },
        attributes: ['id', 'groupId', 'venueId', 'name', 'type', 'startDate', 'endDate'],
        include: [
            {
                model: Group,
                attributes: ['id', 'name', 'city', 'state']
            },
            {
                model: Venue,
                attributes: ['id', 'city', 'state']
            },
            {
                model: EventImage,
                attributes: ['url'],
                where: {
                    preview: true
                },
                required: false,
                limit: 1
            }
        ]
    });

    const eventsRes = await findNumOfAttendeesAndPreviewImg(events);


    return res.json({ Events: eventsRes });
});

router.post('/:groupId/events', requireAuth, checkIfGroupExists, isOrganizerOrCoHost, validateEvent, async (req, res) => {

    const { name, type, capacity, price, description, startDate, endDate } = req.body;

    let { venueId } = req.body;

    if (!venueId) venueId = null;

    const event = await req.group.createEvent({ venueId, name, type, capacity, price, description, startDate, endDate });

    delete event.dataValues.createdAt;
    delete event.dataValues.updatedAt;

    return res.json(event);

});

// Get all Members of a Group specified by its id
router.get('/:groupId/members', checkIfGroupExists, async (req, res, next) => {

    const where = { status: { [Op.ne]: 'pending' } };

    if (req.user) {
        const membership = await Membership.findOne({
            where: {
                userId: req.user.id,
                groupId: req.group.id
            }
        });

        const status = membership ? membership.status : null;

        if (req.user.id === req.group.organizerId || status === 'co-host') {
            delete where.status;
        }
    }

    const group = await Group.findByPk(req.params.groupId, {
        include: {
            attributes: ['id', 'firstName', 'lastName'],
            model: User,
            as: 'Member',
            through: {
                attributes: ['status'],
                model: Membership,
                where
            }
        }
    });

    return res.json({ Members: group.Member });

});


module.exports = router;
