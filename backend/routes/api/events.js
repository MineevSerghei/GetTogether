const express = require('express');
//const { requireAuth } = require('../../utils/auth');
//const { findNumOfMembersAndPreviewImg } = require('../../utils/objects');
const { Event, Group, Venue } = require('../../db/models');
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
            }
        ]
    });

    res.json(events);

});



module.exports = router;
