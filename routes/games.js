const express = require('express');
const router = express.Router();
const { User, GameShelf, Game, Review, Rating } = require('../db/models');
const { asyncHandler } = require('./utils');

router.get('/:id(\\d+)', asyncHandler( async (req, res)=> {
    const gameId = req.params.id;
    const game = await Game.findByPk(gameId);
    const reviews = await Review.findAll({ where: { gameId },  attributes: ['id', 'review', 'userId', 'gameId', 'createdAt'], include: [{ model:User, attributes: ['userName'] }]});
    const ratings = await Rating.findAll({ where: { gameId }});

    let user;
    let gameShelf;
    if (res.locals.authenticated) {
        user = res.locals.user;
        console.log(user)
        gameShelf = await GameShelf.findAll({ where: { userId: user.id, gameId }})
    }
    console.log('reviews');
    res.render('game', { game, title: Game.name, gameShelf, user, reviews, ratings });
}));

const addToGameShelf = async function(gameId, userId, category, res) {
    await GameShelf.create({ gameId, userId, category})

    res.redirect(`/games/${gameId}`)
}

router.post('/:id(\\d+)/played', asyncHandler(async (req, res) => {
    const gameId = req.params.id;
    if (res.locals.authenticated) {
        const user = res.locals.user;
        return await addToGameShelf(gameId, user.id, "Played", res)
    }
    res.redirect(`/games/${gameId}`)
}));

router.post('/:id(\\d+)/playing', asyncHandler(async (req, res) => {
    const gameId = req.params.id;
    if (res.locals.authenticated) {
        const user = res.locals.user;
        return await addToGameShelf(gameId, user.id, "Playing", res)
    }
    res.redirect(`/games/${gameId}`)
}));

router.post('/:id(\\d+)/wishlist', asyncHandler(async (req, res) => {
    const gameId = req.params.id;
    if (res.locals.authenticated) {
        const user = res.locals.user;
        return await addToGameShelf(gameId, user.id, "Wishlist", res)
    }
    res.redirect(`/games/${gameId}`)
}));




module.exports = router
