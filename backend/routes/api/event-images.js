const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Group, Membership, Event, EventImage } = require('../../db/models');
const { throwForbidden } = require('../../utils/roles');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {

    const imageId = parseInt(req.params.imageId, 10);
    let image = null;

    if (imageId)
        image = await EventImage.findByPk(imageId, {
            attributes: ['id'],
            include: {
                model: Event,
                attributes: ['id'],
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
            }
        });

    if (!image) {
        res.status(404);
        return res.json({
            message: "Event Image couldn't be found",
        });
    }

    if (req.user.id === image.Event.Group.organizerId
        || image.Event.Group.Memberships.length) {

        await image.destroy();

        return res.json({ message: "Successfully deleted" });

    } else {
        return next(throwForbidden());
    }

});

module.exports = router;
