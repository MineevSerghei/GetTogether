
const { validationResult } = require('express-validator');
const { Group, Membership } = require('../db/models');

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

const checkIfGroupExists = async (req, res, next) => {
    const group = await Group.findByPk(req.params.groupId);

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

const isOrganizer = async (req, res, next) => {

    if (req.user.id !== req.group.organizerId) {
        const err = new Error('Authorization required');
        err.title = 'Forbidden';
        err.errors = { message: "You don't have the right permissions" };
        err.status = 403;
        return next(err);
    } else {
        next();
    }
}

const isOrganizerOrCoHost = async (req, res, next) => {

    const membership = await Membership.findOne({
        where: {
            userId: req.user.id,
            groupId: req.group.id
        }
    });

    const status = membership ? membership.status : null;

    if (req.user.id === req.group.organizerId
        || status === 'co-host') {
        next();
    } else {
        const err = new Error('Authorization required');
        err.title = 'Forbidden';
        err.errors = { message: "You don't have the right permissions" };
        err.status = 403;
        return next(err);
    }
}

module.exports = {
    handleValidationErrors, checkIfGroupExists, isOrganizer, isOrganizerOrCoHost
};
