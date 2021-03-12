const express = require('express');
const router = express.Router();
const { User, Rating } = require('../../db/models')
const { asyncHandler } = require('../utils');

let avgRating = function(ratings) {
    let sum = 0;
    let count = 0;
    ratings.forEach(rating => {
        sum += rating.dataValues.rating;
        count++;
    });
    return sum / count;
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
    userRating = await userRating.save();
    const ratings = await Rating.findAll({ where: { gameId: req.params.gameId } })
    return res.json({ ratings: true, avg: avgRating(ratings), userRating });
}));

router.delete('/:gameId(\\d+)/ratings/:ratingId(\\d+)', asyncHandler(async (req, res, next) => {
    if (!res.locals.authenticated) {
        return res.status(403).end()
    }

    const userId = res.locals.user.id;
    const ratingId = req.params.ratingId;
    let userRating = await Rating.findOne({ where: { userId, gameId: req.params.gameId } });

    if (userRating.userId !== userId) {
        return res.status(403).end()
    }

    await userRating.destroy();
    const ratings = await Rating.findAll({ where: { gameId: req.params.gameId } })
    if (Array.from(ratings).length === 0) {
        console.log('delete route')
        return res.json({ ratings: false })
    }
    const avg = avgRating(ratings)
    console.log(avg);
    res.json({ ratings: true, avg: avgRating(ratings) })
}));

module.exports = router;
