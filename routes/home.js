const express = require('express');
const router = express.Router();
const { User, GameShelf, Game } = require('../db/models');
const { asyncHandler } = require('./utils');

router.get('/', asyncHandler( async (req, res) => {
    let user;
    let gameshelf;
    if ( res.locals.authenticated ) {
        user = res.locals.user;
        gameshelf = await GameShelf.findAll({ where: { userId: user.id }, include: [{ model:Game, attributes: ['name', 'image'] }]});
    }
    console.log(gameshelf)
    const games = await Game.findAll();

    res.render('home', {user, title: "Homepage", games, gameshelf});
}));

router.get('/:id(\\d+)', (req, res) => {
    const gameId = req.params.id
    res.redirect(`/games/${gameId}`)
})

router.get('/:id(\\d+)/gameshelf/:category', asyncHandler(async(req, res) => {
    let user;
    let gameshelf;
    const category = req.params.category;
    if (res.locals.authenticated) {
        user = res.locals.user
        gameshelf = await GameShelf.findAll({ where: { userId: user.id }, category});
        console.log(gameshelf)
    }
    const games = await Game.findAll();
    res.render('home', {user, title: "Homepage", games, gameshelf})

}))


module.exports = router
