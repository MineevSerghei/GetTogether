
const { validationResult } = require('express-validator');
const { User, Group, Venue, Event } = require('../db/models');
const { check } = require('express-validator');

// middleware for formatting errors from express-validator middleware
const handleValidationErrors = (req, _res, next) => {

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = {};
        validationErrors
            .array()
            .forEach(error => errors[error.param] = error.msg);

        const err = Error("Bad request.");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        next(err);
    }
    next();
};

const validateGroup = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 60, min: 5 })
        .withMessage('Name must be between 5 and 60 characters'),
    check('about')
        .exists({ checkFalsy: true })
        .isLength({ min: 30 })
        .withMessage('About must be 30 characters or more'),
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

const venueExists = async (value, { req, location, path }) => {

    if (value) {
        const venue = await Venue.findByPk(value);

        if (!venue || venue.groupId !== req.group.id) throw new Error("Venue does not exist");
    }
}

const checkEndAfterStart = async (endDate, { req, location, path }) => {

    let { startDate } = req.body;

    startDate = (new Date(startDate)).getTime();
    endDate = (new Date(endDate)).getTime();

    if ((endDate - startDate) < 0) {
        throw new Error("End date is less than start date");
    }

}

const validateEvent = [

    check('venueId')
        .custom(venueExists)
        .withMessage('Venue does not exist'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage('Name must be at least 5 characters'),
    check('type')
        .exists({ checkFalsy: true })
        .isIn(['Online', 'In person'])
        .withMessage("Type must be Online or In person"),
    check('capacity')
        .exists({ checkNull: true })
        .isInt({ min: 0 })
        .withMessage('Capacity must be an integer'),
    check('price')
        .exists({ checkNull: true })
        .isFloat({ min: 0 })
        .withMessage('Price is invalid'),
    check('private')
        .exists()
        .isBoolean()
        .withMessage('Private must be a boolean'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('startDate')
        .exists({ checkFalsy: true })
        .withMessage('Start date is required'),
    check('startDate')
        .isAfter()
        .withMessage('Start date must be in the future'),
    check('endDate')
        .exists({ checkFalsy: true })
        .withMessage('End date is required'),
    check('endDate')
        .custom(checkEndAfterStart)
        .withMessage('End date is less than start date'),
    handleValidationErrors
];

const userExists = async (value) => {
    const user = await User.findByPk(value);

    if (!user) throw new Error("User couldn't be found");
}

const validateMembershipChange = [
    check('memberId')
        .exists({ checkFalsy: true })
        .withMessage("User couldn't be found"),
    check('memberId')
        .custom(userExists)
        .withMessage("User couldn't be found"),
    check('status')
        .isIn(['member', 'co-host'])
        .withMessage("Status value must be valid"),
    check('status')
        .not()
        .equals('pending')
        .withMessage("Cannot change a membership status to pending"),
    handleValidationErrors
];

const validateMembershipDelete = [
    check('memberId')
        .exists({ checkFalsy: true })
        .custom(userExists)
        .withMessage("User couldn't be found"),
    handleValidationErrors
]

const validateAttendanceDelete = [
    check('userId')
        .exists({ checkFalsy: true })
        .custom(userExists)
        .withMessage("User couldn't be found"),
    handleValidationErrors
]

const validateAttendanceChange = [
    check('userId')
        .exists({ checkFalsy: true })
        .withMessage("User couldn't be found"),
    check('userId')
        .custom(userExists)
        .withMessage("User couldn't be found"),
    check('status')
        .isIn(['attending', 'waitlist'])
        .withMessage("Status value must be valid"),
    check('status')
        .not()
        .equals('pending')
        .withMessage("Cannot change a membership status to pending"),
    handleValidationErrors
];

const validateEventFilters = [
    check('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be greater than or equal to 1"),
    check('size')
        .optional()
        .isInt({ min: 1 })
        .withMessage("Size must be greater than or equal to 1"),
    check('name')
        .optional()
        .isString()
        .notEmpty()
        .withMessage("Name must be a string"),
    check('type')
        .optional()
        .isIn(['Online', 'In person'])
        .withMessage("Type must be 'Online' or 'In person'"),
    check('startDate')
        .optional()
        .toDate()
        .exists({ checkNull: true })
        .withMessage("Start date must be a valid datetime"),
    handleValidationErrors
];

const checkIfGroupExists = async (req, res, next) => {

    const groupId = parseInt(req.params.groupId, 10);
    let group = null;
    if (groupId) group = await Group.findByPk(groupId);

    if (!group) {
        res.status(404);
        return res.json({
            "message": "Group couldn't be found",
        });
    } else {
        req.group = group;
        next();
    }
}

const checkIfVenueExists = async (req, res, next) => {

    const venueId = parseInt(req.params.venueId, 10);
    let venue = null;
    if (venueId)
        venue = await Venue.findByPk(venueId, { include: Group });

    if (!venue) {
        res.status(404);
        return res.json({
            "message": "Venue couldn't be found",
        });
    } else {
        req.group = venue.Group;
        delete venue.dataValues.Group;
        req.venue = venue;
        next();
    }
}

const checkIfEventExists = async (req, res, next) => {

    const eventId = parseInt(req.params.eventId, 10);
    let event = null;
    if (eventId)
        event = await Event.findByPk(eventId, { include: Group });

    if (!event) {
        res.status(404);
        return res.json({
            "message": "Event couldn't be found",
        });
    } else {
        req.group = event.Group;
        delete event.dataValues.Group;
        req.event = event;
        next();
    }
}


module.exports = {
    handleValidationErrors,
    checkIfGroupExists,
    checkIfVenueExists,
    checkIfEventExists,
    validateVenue,
    validateGroup,
    validateImage,
    validateEvent,
    validateMembershipChange,
    validateMembershipDelete,
    validateAttendanceChange,
    validateAttendanceDelete,
    validateEventFilters
};
