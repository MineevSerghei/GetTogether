const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Group, GroupImage, Membership, User, Venue } = require('../../db/models');

const { checkIfVenueExists, validateVenue } = require('../../utils/validation');
const { isOrganizerOrCoHost, throwForbidden } = require('../../utils/roles');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {

    const imageId = parseInt(req.params.imageId, 10);
    let image = null;

    if (imageId)
        image = await GroupImage.findByPk(imageId, {
            attributes: ['id'],
            include: [
                {
                    model: Group,
                    attributes: ['id', 'organizerId'],
                    include: {
                        attributes: ['id'],
                        model: Membership,
                        where: {
                            userId: req.user.id,
                            status: 'co-host'
                        },
                        required: false
                    }
                }
            ]
        });

    if (!image) {
        res.status(404);
        return res.json({
            message: "Group Image couldn't be found",
        });
    }

    if (req.user.id === image.Group.organizerId
        || image.Group.Memberships.length) {

        await image.destroy();

        return res.json({ message: "Successfully deleted" });

    } else {
        return next(throwForbidden());
    }

});


module.exports = router;
