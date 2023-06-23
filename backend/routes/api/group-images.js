const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Group, GroupImage, Membership } = require('../../db/models');
const { throwForbidden } = require('../../utils/roles');
const { singlePublicFileDelete } = require('../../awsS3');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {

    const imageId = parseInt(req.params.imageId, 10);
    let image = null;

    if (imageId)
        image = await GroupImage.findByPk(imageId, {
            attributes: ['id', 'url'],
            include: {
                model: Group,
                attributes: ['id', 'organizerId'],
                include: {
                    model: Membership,
                    attributes: ['id'],
                    where: {
                        userId: req.user.id,
                        status: 'co-host'
                    },
                    required: false
                }
            }
        });

    if (!image) {
        res.status(404);
        return res.json({
            message: "Group Image couldn't be found",
        });
    }

    if (req.user.id === image.Group.organizerId
        || image.Group.Memberships.length) {

        await singlePublicFileDelete(image.url);
        await image.destroy();

        return res.json({ message: "Successfully deleted" });

    } else {
        return next(throwForbidden());
    }

});


module.exports = router;
