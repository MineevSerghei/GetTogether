const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Group, GroupImage, Membership, User, Venue } = require('../../db/models');

const { checkIfVenueExists, validateVenue } = require('../../utils/validation');
const { isOrganizerOrCoHost } = require('../../utils/roles');

const router = express.Router();

router.put('/:venueId', requireAuth, checkIfVenueExists, isOrganizerOrCoHost, validateVenue, async (req, res) => {

    const venue = req.venue;

    const { address, city, state, lat, lng } = req.body;

    venue.address = address;
    venue.city = city;
    venue.state = state;
    venue.lat = lat;
    venue.lng = lng;

    await venue.save();

    delete venue.dataValues.updatedAt;

    return res.json(venue);
});



module.exports = router;
