const express = require('express');
const router = express.Router();
const { User, GameShelf, Game, Review, Rating } = require('../db/models');
const { asyncHandler } = require('./utils');

router.get('/', asyncHandler(async (req, res) => {
    const games = await Game.findAll({ attributes: ['name', 'id']});
    res.json({ games })
}))

router.get('/:id(\\d+)', asyncHandler( async (req, res)=> {
    const gameId = req.params.id;
    const game = await Game.findByPk(gameId);
    const reviews = await Review.findAll({ where: { gameId },  attributes: ['id', 'review', 'userId', 'gameId', 'createdAt'], include: [{ model:User, attributes: ['userName'] }]});
    const ratings = await Rating.findAll({ where: { gameId }});

    let user;
    let gameshelf;
    let userRating;
    if (res.locals.authenticated) {
        user = res.locals.user;
        gameshelf = await GameShelf.findOne({ where: { userId: user.id, gameId }})
        userRating = await Rating.findOne({ where: {userId: user.id, gameId }, attributes: ['id', 'rating']});
    }
    res.render('game', { game, title: game.name, gameshelf, user, reviews, ratings, userRating });
}));

router.post('/:id(\\d+)/gameshelf/:category', asyncHandler(async (req, res) => {
    const gameId = req.params.id;
    const category = req.params.category;
    if (res.locals.authenticated) {
        const user = res.locals.user;
        await GameShelf.create({gameId, userId: user.id, category });
    }
    res.redirect(`/games/${gameId}`)
}));

router.put('/:id(\\d+)/gameshelf/:category', asyncHandler(async (req, res) => {
    const gameId = req.params.id;
    const category = req.params.category;
    if (res.locals.authenticated) {
        const user = res.locals.user;
        await GameShelf.destroy({where: { userId: user.id, gameId }});
        await GameShelf.create({gameId, userId: user.id, category });
    }
    res.redirect(`/games/${gameId}`);
}));

router.delete('/:id(\\d+)/gameshelf', asyncHandler(async (req, res) => {
    const gameId = req.params.id;
    if (res.locals.authenticated) {
        const user = res.locals.user;
        await GameShelf.destroy({where: {userId: user.id, gameId }});
    }
    res.redirect(`/games/${gameId}`)
}));

module.exports = router
