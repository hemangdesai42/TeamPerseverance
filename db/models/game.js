'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    description: DataTypes.TEXT,
    releaseDate: DataTypes.DATE,
    platform: DataTypes.STRING
  }, {});
  Game.associate = function(models) {
    // associations can be defined here
  };
  return Game;
};