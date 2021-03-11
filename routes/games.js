const express = require('express');
const router = express.Router();
const { User, GameShelf, Game, Review, Rating } = require('../db/models');
const { asyncHandler } = require('./utils');

router.get('/:id(\\d+)', asyncHandler( async (req, res)=> {
    const gameId = req.params.id;
    const game = await Game.findByPk(gameId);

    let user;
    let gameShelf;
    if (res.locals.authenticated) {
        user = res.locals.user;
        gameShelf = await GameShelf.findAll({ where: { userId: user.id, gameId }})
    }

    res.render('game', { game, title: game.name, gameShelf });
}));

const addToGameShelf = async function(gameId, userId, category, res) {
    await GameShelf.create({ gameId, userId, category})

    res.redirect(`/games/${gameId}`)
}

router.get('/:id(\\d+)/played', asyncHandler(async (req, res) => {
    const gameId = req.params.id;
    if (res.locals.authenticated) {
        const user = res.locals.user;
        return await addToGameShelf(gameId, user.id, "Played", res)
    }
    res.redirect(`/games/${gameId}`)
}));

router.get('/:id(\\d+)/playing', asyncHandler(async (req, res) => {
    const gameId = req.params.id;
    if (res.locals.authenticated) {
        const user = res.locals.user;
        return await addToGameShelf(gameId, user.id, "Playing", res)
    }
    res.redirect(`/games/${gameId}`)
}));

router.get('/:id(\\d+)/wishlist', asyncHandler(async (req, res) => {
    const gameId = req.params.id;
    if (res.locals.authenticated) {
        const user = res.locals.user;
        return await addToGameShelf(gameId, user.id, "Wishlist", res)
    }
    res.redirect(`/games/${gameId}`)
}));

module.exports = router
