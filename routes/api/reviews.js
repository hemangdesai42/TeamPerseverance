const express = require('express');
const router = express.Router();
const { User, Review } = require('../../db/models')
const { csrfProtection, asyncHandler } = require('../utils');


router.get('/:id(\\d+)/reviews', asyncHandler(async(req, res, next) => {
    const reviews = await Review.findAll({ where: {gameId: req.params.id}})
    res.json({reviews})
}))

router.post('/:id(\\d+)/reviews', asyncHandler(async(req, res, next) => {
    if (!res.locals.authenticated) {
        return res.status(403).end()
    }
    const userId = res.locals.user.id
    const gameId = req.params.id
    const review = req.body.userReview
    const userReview = await Review.create({userId, gameId, review})
    console.log(userId, gameId, review);
    return res.json({userReview})
}))

router.put('/:gameId(\\d+)/reviews/:reviewId(\\d+)', asyncHandler(async(req, res, next) => {
    if (!res.locals.authenticated) {
        return res.status(403).end()
    }

    const userId = res.locals.user.id
    const gameId = req.params.gameId
    const reviewId = req.params.reviewId
    const review = req.body.userReview
    let userReview = await Review.findByPk(reviewId)

    if (userReview.userId !== userId) {
        return res.status(403).end()
    }
    userReview.review = review
    userReview = await userReview.update()
    res.json({userReview})
}))

router.delete('/:gameId(\\d+)/reviews/:reviewId(\\d+)', asyncHandler(async(req, res, next) => {
    if (!res.locals.authenticated) {
        return res.status(403).end()
    }

    const userId = res.locals.user.id
    const reviewId = req.params.reviewId
    let userReview = await Review.findByPk(reviewId)

    if (userReview.userId !== userId) {
        return res.status(403).end()
    }
    await userReview.destroy()
    res.status(204).end()
}));

module.exports = router
