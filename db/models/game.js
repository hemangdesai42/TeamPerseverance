'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    name: {
      allowNull: false,
      type: Sequelize.STRING(200),
      unique: true
    },
    genre: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    description: {
      allowNull: false,
      type: Sequelize.TEXT
    },
    releaseDate: {
      allowNull: false,
      type: Sequelize.DATE
    },
    platform: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
  }, {});
  Game.associate = function(models) {
    Game.hasMany(models.Review, { foreignkey: 'gameId' })
    Game.hasMany(models.Rating, { foreignkey: 'gameId' })
    Game.hasMany(models.GameShelf, { foreignkey: 'gameId' })
  };
  return Game;
};