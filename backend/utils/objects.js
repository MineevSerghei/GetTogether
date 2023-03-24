const { Membership, Attendance } = require('../db/models');
const { Op } = require('sequelize');


const findNumOfMembersAndPreviewImg = async groups => {
    const groupsRes = [];

    for (let groupInstanceObj of groups) {

        const group = groupInstanceObj.toJSON();

        // Getting the number of members of each group
        group.numMembers = await Membership.count({
            where: {
                groupId: group.id,
                status: { [Op.ne]: 'pending' }
            }
        });

        // putting the preview image url into previewImage property (if there is a preview image)
        group.previewImage = group.GroupImages.length ? group.GroupImages[0].url : null;

        delete group.GroupImages;
        groupsRes.push(group);
    }

    return groupsRes;
}

const findNumOfAttendeesAndPreviewImg = async events => {
    const eventsRes = [];

    for (let eventInstanceObj of events) {

        const event = eventInstanceObj.toJSON();

        // Getting the number of attendees of each event
        event.numAttending = await Attendance.count({
            where: {
                eventId: event.id,
                status: { [Op.ne]: 'pending' }
            }
        });

        // putting the preview image url into previewImage property (if there is a preview image)
        event.previewImage = event.EventImages.length ? event.EventImages[0].url : null;

        delete event.EventImages;
        eventsRes.push(event);
    }

    return eventsRes;
}

const pagination = (req, res, next) => {
    let { size, page } = req.query

    size = parseInt(size, 10);
    page = parseInt(page, 10);

    if (!size) size = 20;
    if (!page) page = 1;

    if (size > 20) size = 20;
    if (page > 10) page = 10;

    if (size < 1) size = 1;
    if (page < 1) page = 1;

    let pagination = {};
    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }
    req.pagination = pagination;
    next();
}


module.exports = {
    findNumOfMembersAndPreviewImg,
    findNumOfAttendeesAndPreviewImg,
    pagination
};
