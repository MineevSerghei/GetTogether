const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { findNumOfMembersAndPreviewImg, findNumOfAttendeesAndPreviewImg } = require('../../utils/objects');
const { Group, GroupImage, Membership, User, Venue, Event, EventImage, Attendance } = require('../../db/models');
const { isOrganizer, isOrganizerOrCoHost, throwForbidden } = require('../../utils/roles');
const { Op } = require('sequelize');
const { checkIfGroupExists,
    validateVenue,
    validateGroup,
    validateImage,
    validateEvent,
    validateMembershipChange,
    validateMembershipDelete } = require('../../utils/validation');

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

    const groupId = parseInt(req.params.groupId, 10);
    let groupInstanceObj = null;
    if (groupId)
        groupInstanceObj = await Group.findByPk(groupId, {
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
                },
                {
                    model: Event,
                    required: false,
                    include: [
                        {
                            model: Venue,
                            required: false
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
            groupId: req.group.id
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

    const { name, type, capacity, price, description } = req.body;

    let { venueId, private, startDate, endDate } = req.body;

    if (!venueId) venueId = null;
    if (!private) private = false;

    startDate = new Date(startDate);
    endDate = new Date(endDate);

    const event = await req.group.createEvent({ venueId, name, type, capacity, price, description, private, startDate, endDate });

    delete event.dataValues.createdAt;
    delete event.dataValues.updatedAt;

    return res.json(event);

});

// Get all Members of a Group specified by its id
router.get('/:groupId/members', checkIfGroupExists, async (req, res) => {

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

    const group = await Group.findByPk(req.group.id, {
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

router.get('/:groupId/status', checkIfGroupExists, async (req, res) => {

    if (!req.user) return res.json({ status: null })

    if (req.user.id === req.group.organizerId) return res.json({ status: 'organizer' })

    const membership = await Membership.findOne({
        attributes: ['id', 'userId', 'groupId', 'status'],
        where: {
            groupId: req.group.id,
            userId: req.user.id
        }
    });

    if (!membership) return res.json({ status: 'none' })

    return res.json({ status: membership.status });

});

// Request a Membership for a Group based on the Group's id
router.post('/:groupId/membership', requireAuth, async (req, res) => {

    const groupId = parseInt(req.params.groupId, 10);
    let group = null;
    if (groupId)
        group = await Group.findByPk(groupId, {
            attributes: ['id', 'organizerId'],
            include: {
                attributes: ['status'],
                model: Membership,
                where: {
                    userId: req.user.id
                },
                required: false
            }
        });

    if (!group) {
        res.status(404);
        return res.json({ message: "Group couldn't be found" });
    }

    if (group.Memberships.length) {

        const status = group.Memberships[0].status;
        res.status(400);

        if (status === 'pending')
            return res.json({ message: "Membership has already been requested" });


        if (status === 'member' || status === 'co-host')
            return res.json({ message: "User is already a member of the group" });

    }

    if (group.organizerId === req.user.id) {
        res.status(400);
        return res.json({ message: "User is already a member of the group" });
    }

    const request = await Membership.create(
        {
            userId: req.user.id,
            groupId: groupId,
            status: 'pending'
        });

    return res.json({ memberId: request.userId, status: request.status });

});

// Change the status of a membership for a group specified by id
router.put('/:groupId/membership', requireAuth, checkIfGroupExists, isOrganizerOrCoHost, validateMembershipChange, async (req, res, next) => {

    const newStatus = req.body.status;

    const membership = await Membership.findOne({
        attributes: ['id', 'userId', 'groupId', 'status'],
        where: {
            groupId: req.group.id,
            userId: req.body.memberId
        }
    });

    if (!membership) {
        res.status(404);
        return res.json({
            "message": "Membership between the user and the group does not exist",
        });
    }

    const { role } = req.user;
    const oldStatus = membership.status;

    if ((role === 'co-host' && (oldStatus === 'pending' || oldStatus === 'member') && newStatus === 'member')
        || (role === 'organizer' && (newStatus === 'co-host' || newStatus === 'member'))) {

        membership.status = newStatus;
        await membership.save();

        const { id, groupId, userId, status } = membership;

        return res.json({ id, groupId, memberId: userId, status });

    } else {
        return next(throwForbidden());
    }

});

// Delete membership to a group specified by id
router.delete('/:groupId/membership', requireAuth, checkIfGroupExists, validateMembershipDelete, async (req, res, next) => {

    const membership = await Membership.findOne({
        attributes: ['id', 'userId', 'groupId', 'status'],
        where: {
            groupId: req.group.id,
            userId: req.body.memberId
        }
    });

    if (!membership) {
        res.status(404);
        return res.json({
            "message": "Membership does not exist for this User",
        });
    }

    if (req.user.id === req.group.organizerId ||
        req.user.id === req.body.memberId) {

        await membership.destroy();

        const atts = await Attendance.findAll({
            where: {
                userId: membership.userId
            },
            include: {
                model: Event,
                where: {
                    groupId: membership.groupId
                }
            }
        });

        for (let att of atts) await att.destroy();

        return res.json({
            "message": "Successfully deleted membership from group"
        });
    } else {
        return next(throwForbidden());
    }
});




module.exports = router;
