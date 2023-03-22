const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { findNumOfAttendeesAndPreviewImg } = require('../../utils/objects');
const { Event, Group, Venue, EventImage, Attendance } = require('../../db/models');
//const { Op } = require('sequelize');

const { isHostCohostOrAttendee } = require('../../utils/roles');

const { checkIfEventExists, validateImage } = require('../../utils/validation');

const router = express.Router();


router.get('/', async (req, res) => {
    const events = await Event.findAll({
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

// Get details of an Event specified by its id
router.get('/:eventId', async (req, res) => {

    const eventInstanceObj = await Event.findByPk(req.params.eventId, {
        include: [
            {
                model: Group,
                attributes: ['id', 'name', 'private', 'city', 'state']
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
router.post('/:eventId/images', requireAuth, checkIfEventExists, isHostCohostOrAttendee, validateImage, async (req, res) => {

    const image = await req.event.createEventImage({
        url: req.body.url,
        preview: req.body.preview
    });

    const { id, url, preview } = image.toJSON();

    return res.json({ id, url, preview });

});



module.exports = router;
