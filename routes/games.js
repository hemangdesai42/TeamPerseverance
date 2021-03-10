const express = require('express');
const router = express.Router();
const { User, GameShelf, Game, Review, Rating } = require('../db/models');
const { asyncHandler } = require('./utils');

router.get('/:id(\\d+)', asyncHandler( async (req, res)=> {
    const gameId = req.params.id;
    const game = await Game.findByPk(gameId);

    res.render('game', { game, title: game.name });
}));





module.exports = router
