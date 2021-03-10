const express = require('express');
const router = express.Router();
const { User, GameShelf, Game } = require('../db/models');
const { asyncHandler } = require('./utils');

router.get('/', asyncHandler( async (req, res) => {
    let user;
    let gameShelf;
    if ( res.locals.authenticated ) {
        user = res.locals.user;
        gameShelf = await GameShelf.findAll({ where: { userId: user.id }});
    }

    const games = await Game.findAll();

    res.render('home', {user, title: "Homepage", games, gameShelf});
}));

router.get('/:id(\\d+)', (req, res) => {
    const gameId = req.params.id
    res.redirect(`/games/${gameId}`)
})


module.exports = router
