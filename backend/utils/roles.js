const { Membership, Attendance } = require('../db/models');

const throwForbidden = (msg) => {
    const err = new Error('Forbidden');
    err.title = 'Forbidden';
    err.errors = { message: msg || "Forbidden" };
    err.status = 403;
    return err;
}

const isOrganizer = async (req, res, next) => {

    if (req.user.id !== req.group.organizerId) {
        return next(throwForbidden());
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

    if (req.user.id === req.group.organizerId) {
        req.user.role = 'organizer';
        next();
    } else if (status === 'co-host') {
        req.user.role = status;
        next();
    }
    else {
        return next(throwForbidden());
    }
}

const isHostCohostOrAttendee = async (req, res, next) => {

    const membership = await Membership.findOne({
        where: {
            userId: req.user.id,
            groupId: req.group.id
        }
    });

    const memberStatus = membership ? membership.status : null;

    const attendance = await Attendance.findOne({
        where: {
            eventId: req.event.id,
            userId: req.user.id
        }
    });

    const attendStatus = attendance ? attendance.status : null;

    if (req.user.id === req.group.organizerId
        || memberStatus === 'co-host'
        || attendStatus === 'attending') {
        next();
    } else {
        return next(throwForbidden());
    }
}

module.exports = {
    isOrganizer,
    isOrganizerOrCoHost,
    isHostCohostOrAttendee,
    throwForbidden
};
