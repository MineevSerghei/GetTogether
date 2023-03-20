const { Membership } = require('../db/models');
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


module.exports = {
    findNumOfMembersAndPreviewImg
};
