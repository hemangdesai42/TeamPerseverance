const express = require('express');
const router = express.Router();
const { User, Rating } = require('../../db/models')
const { asyncHandler } = require('../utils');

let avgRating = function(ratings) {
    return ratings.reduce(function(acc, rating) {
        return acc + rating.rating
    })/ratings.length;

}


router.get('/:id(\\d+)/ratings', asyncHandler(async (req, res, next) => {
    const ratings = await Rating.findAll({ where: { gameId: req.params.id } })

    if (!ratings) {
        return res.json({ ratings: false })
    }
    res.json({ ratings: true, avg: avgRating(ratings) })
}));

router.post('/:id(\\d+)/ratings', asyncHandler(async (req, res, next) => {
    if (!res.locals.authenticated) {
        return res.status(403).end()
    }

    const userId = res.locals.user.id
    const gameId = req.params.id

    if (await Rating.findOne({ where: { gameId, userId }})) {
        return res.status(403).end()
    }
    const rating = req.body.userRating;
    const userRating = await Rating.create({ userId, gameId, rating })
    const ratings = await Rating.findAll({ where: { gameId: req.params.id } })
    return res.json({ ratings: true, avg: avgRating(ratings), userRating});
}));

router.put('/:gameId(\\d+)/ratings/:ratingId(\\d+)', asyncHandler(async (req, res, next) => {
    if (!res.locals.authenticated) {
        return res.status(403).end()
    };

    const userId = res.locals.user.id
    const gameId = req.params.gameId

    const ratingId = req.params.ratingId
    const rating = req.body.userRating
    let userRating = await Rating.findOne({where: {id: ratingId}});

    if (userRating.userId !== userId) {
        return res.status(403).end()
    };

    userRating.rating = rating;
    await userRating.update();
    const ratings = await Rating.findAll({ where: { gameId: req.params.id } })
    return res.json({ ratings: true, avg: avgRating(ratings), userRating });
}));

router.delete('/:gameId(\\d+)/ratings/:ratingId(\\d+)', asyncHandler(async (req, res, next) => {
    if (!res.locals.authenticated) {
        return res.status(403).end()
    }

    const userId = res.locals.user.id
    const ratingId = req.params.ratingId
    let userRating = await Rating.findByPk(ratingId);

    if (userReview.userId !== userId) {
        return res.status(403).end()
    }

    await userRating.destroy()
    res.status(204);
    const ratings = await Rating.findAll({ where: { gameId: req.params.id } })

    if (!ratings) {
        return res.json({ ratings: false })
    }
    res.json({ ratings: true, avg: avgRating(ratings) })

}));

module.exports = router;
