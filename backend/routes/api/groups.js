const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Group, GroupImage, Membership } = require('../../db/models');
const { Op } = require('sequelize');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all Groups
router.get('/', async (req, res) => {

    const groups = await Group.findAll({
        include: {
            model: GroupImage,
            attributes: ['url'],
            where: {
                preview: true
            },
            required: false,
            limit: 1
        }
    });

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

        // if (group.GroupImages.length) {
        //     group.previewImage = group.GroupImages[0].url;
        // } else {
        //     group.previewImage = null;
        // }

        delete group.GroupImages;
        groupsRes.push(group);
    }

    return res.json(groupsRes);
});









module.exports = router;
