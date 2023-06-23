const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { findNumOfAttendeesAndPreviewImg, pagination } = require('../../utils/objects');
const { Event, Group, Venue, EventImage, Attendance, Membership, User, GroupImage } = require('../../db/models');
const { Op } = require('sequelize');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');


const { isHostCohostOrAttendee, isOrganizerOrCoHost, throwForbidden } = require('../../utils/roles');

const { checkIfEventExists, validateImage, validateEvent, validateAttendanceChange, validateAttendanceDelete, validateEventFilters } = require('../../utils/validation');

const router = express.Router();


router.get('/', validateEventFilters, pagination, async (req, res) => {

    let { name, type, startDate } = req.query;

    const filters = { where: {} };

    if (name) {
        filters.where.name = { [Op.substring]: name };
    }

    if (type) {
        filters.where.type = type;
    }

    if (startDate) {
        startDate = (new Date(startDate)).getTime()
        startDate = new Date(startDate);
        filters.where.startDate = startDate;
    }

    const events = await Event.findAll({
        attributes: ['id', 'groupId', 'venueId', 'name', 'type', 'startDate', 'endDate', 'description'],
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
        ],
        ...req.pagination,
        ...filters

    });

    const eventsRes = await findNumOfAttendeesAndPreviewImg(events);

    return res.json({ Events: eventsRes });

});

// Get details of an Event specified by its id
router.get('/:eventId', async (req, res) => {

    const eventId = parseInt(req.params.eventId, 10);
    let eventInstanceObj = null;

    if (eventId)
        eventInstanceObj = await Event.findByPk(eventId, {
            include: [
                {
                    model: Group,
                    attributes: ['id', 'organizerId', 'name', 'private', 'city', 'state'],
                    include: [
                        {
                            model: User,
                            as: 'Organizer',
                            attributes: ['id', 'firstName', 'lastName']
                        },
                        {
                            model: GroupImage,
                            attributes: ['url'],
                            where: {
                                preview: true
                            },
                            required: false,
                            limit: 1
                        }
                    ]
                },
                {
                    model: Venue,
                    attributes: ['id', 'address', 'city', 'state', 'lat', 'lng']
                },
                {
                    model: EventImage,
                    attributes: ['id', 'url', 'preview']
                }
            ]
        });

    if (!eventInstanceObj) {
        res.status(404);
        return res.json({
            "message": "Event couldn't be found",
        });
    }

    const event = eventInstanceObj.toJSON();

    // Getting the number of attendees of each event
    event.numAttending = await Attendance.count({
        where: {
            eventId: event.id,
            status: 'attending'
        }
    });

    return res.json(event);

});

// Add an Image to a Event based on the Event's id
router.post('/:eventId/images', singleMulterUpload("image"), requireAuth, checkIfEventExists, isHostCohostOrAttendee, validateImage, async (req, res) => {

    if (!req.file) {
        res.status(400);
        return res.json({ errors: "Image was not provided" });
    }

    if (req.file.size > 1024 * 1024) {
        res.status(400);
        return res.json({ errors: "Image file size must not exceed 1MB" });
    }

    const imageUrl = await singlePublicFileUpload(req.file);

    if (!imageUrl) {
        res.status(400);
        return res.json({ errors: "Something was wrong with the image (possibly exceeded file size)" });
    }

    const image = await req.event.createEventImage({
        url: imageUrl,
        preview: req.body.preview
    });

    const { id, url, preview } = image.toJSON();

    return res.json({ id, url, preview });

});

// Edit an Event specified by its id
router.put('/:eventId', requireAuth, checkIfEventExists, isOrganizerOrCoHost, validateEvent, async (req, res) => {

    const event = req.event;

    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;

    event.venueId = venueId ? venueId : null;
    event.name = name;
    event.type = type;
    event.capacity = capacity;
    event.price = price;
    event.description = description;
    event.startDate = startDate;
    event.endDate = endDate;

    await event.save();

    delete event.dataValues.updatedAt;

    return res.json(event);

});

router.delete('/:eventId', requireAuth, checkIfEventExists, isOrganizerOrCoHost, async (req, res) => {
    await req.event.destroy();

    return res.json({
        "message": "Successfully deleted",
    });
});

// Get all Attendees of an Event specified by its id

router.get('/:eventId/attendees', checkIfEventExists, async (req, res) => {

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

    const event = await Event.findByPk(req.event.id, {
        include: {
            attributes: ['id', 'firstName', 'lastName'],
            model: User,
            as: 'Attendee',
            through: {
                attributes: ['status'],
                model: Attendance,
                where
            }
        }
    });

    return res.json({ Attendees: event.Attendee });

});


// Request to Attend an Event based on the Event's id
router.post('/:eventId/attendance', requireAuth, async (req, res, next) => {

    const eventId = parseInt(req.params.eventId, 10);
    let event = null;

    if (eventId)
        event = await Event.findByPk(eventId, {
            attributes: ['id'],
            include: [
                {
                    model: Group,
                    attributes: ['id', 'organizerId'],
                    include: {
                        model: Membership,
                        attributes: ['status'],
                        where: {
                            userId: req.user.id
                        },
                        required: false
                    }
                },
                {
                    model: Attendance,
                    attributes: ['status'],
                    where: {
                        userId: req.user.id
                    },
                    required: false
                }
            ]
        });

    if (!event) {
        res.status(404);
        return res.json({
            "message": "Event couldn't be found",
        });
    }

    let membershipStatus = null;

    if (event.Group.Memberships.length) {
        membershipStatus = event.Group.Memberships[0].status
    } else if (event.Group.organizerId === req.user.id) {
        membershipStatus = 'organizer';
    }

    if (membershipStatus === 'member' ||
        membershipStatus === 'co-host' ||
        membershipStatus === 'organizer') {

        if (event.Attendances.length) {
            const attendanceStatus = event.Attendances[0].status;
            res.status(400);

            if (attendanceStatus === 'attending')
                return res.json({ message: "User is already an attendee of the event" });

            if (attendanceStatus === 'waitlist')
                return res.json({ message: "User is already on the waitlist for the event" });

            if (attendanceStatus === 'pending')
                return res.json({ message: "Attendance has already been requested" });
        }

        const request = await Attendance.create(
            {
                userId: req.user.id,
                eventId: eventId,
                status: 'pending'
            });

        return res.json({ userId: request.userId, status: request.status });

    } else {
        return next(throwForbidden());
    }
});

// Change the status of an attendance for an event specified by id
router.put('/:eventId/attendance', requireAuth, checkIfEventExists, isOrganizerOrCoHost, validateAttendanceChange, async (req, res) => {

    const attendance = await Attendance.findOne({
        attributes: ['id', 'userId', 'eventId', 'status'],
        where: {
            eventId: req.event.id,
            userId: req.body.userId
        }
    });

    if (!attendance) {
        res.status(404);
        return res.json({
            message: "Attendance between the user and the event does not exist",
        });
    }

    attendance.status = req.body.status;
    await attendance.save();

    const { id, eventId, userId, status } = attendance;
    return res.json({ id, eventId, userId, status });
});

// Delete attendance to an event specified by id
router.delete('/:eventId/attendance', requireAuth, checkIfEventExists, validateAttendanceDelete, async (req, res, next) => {

    const attendance = await Attendance.findOne({
        attributes: ['id', 'userId', 'eventId', 'status'],
        where: {
            eventId: req.event.id,
            userId: req.body.userId
        }
    });

    if (!attendance) {
        res.status(404);
        return res.json({
            message: "Attendance does not exist for this User",
        });
    }

    if (req.user.id === req.group.organizerId ||
        req.user.id === req.body.userId) {

        await attendance.destroy();
        return res.json({
            "message": "Successfully deleted attendance from event",
        });
    } else {
        return next(throwForbidden("Only the User or organizer may delete an Attendance"));
    }

});

module.exports = router;
