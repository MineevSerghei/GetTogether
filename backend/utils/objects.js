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
                status: 'attending'
            }
        });

        // putting the preview image url into previewImage property (if there is a preview image)
        event.previewImage = event.EventImages.length ? event.EventImages[0].url : null;

        delete event.EventImages;
        eventsRes.push(event);
    }

    return eventsRes;
}


module.exports = {
    findNumOfMembersAndPreviewImg,
    findNumOfAttendeesAndPreviewImg
};
