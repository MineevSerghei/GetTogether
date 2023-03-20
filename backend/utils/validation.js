
const { validationResult } = require('express-validator');
const { Group } = require('../db/models');

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
        res.status(403);
        return res.json({
            "message": "Forbidden"
        });
    } else {
        next();
    }
}

module.exports = {
    handleValidationErrors, checkIfGroupExists, isOrganizer
};
