const { Membership, Attendance } = require('../db/models');

const isOrganizer = async (req, res, next) => {

    if (req.user.id !== req.group.organizerId) {
        const err = new Error('Forbidden');
        err.title = 'Forbidden';
        err.errors = { message: "Forbidden" };
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
        const err = new Error('Forbidden');
        err.title = 'Forbidden';
        err.errors = { message: "Forbidden" };
        err.status = 403;
        return next(err);
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
        const err = new Error('Forbidden');
        err.title = 'Forbidden';
        err.errors = { message: "Forbidden" };
        err.status = 403;
        return next(err);
    }
}

module.exports = {
    isOrganizer,
    isOrganizerOrCoHost,
    isHostCohostOrAttendee
};
