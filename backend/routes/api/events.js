const express = require('express');
//const { requireAuth } = require('../../utils/auth');
const { findNumOfAttendeesAndPreviewImg } = require('../../utils/objects');
const { Event, Group, Venue, EventImage } = require('../../db/models');
//const { Op } = require('sequelize');

//const { checkIfVenueExists, isOrganizerOrCoHost } = require('../../utils/validation');

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

    res.json(eventsRes);

});



module.exports = router;
