'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(200),
      unique: true
    },
    genre: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    releaseDate: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    platform: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
  }, {});
  Game.associate = function(models) {
    Game.hasMany(models.Review, { foreignkey: 'gameId' })
    Game.hasMany(models.Rating, { foreignkey: 'gameId' })
    Game.hasMany(models.GameShelf, { foreignkey: 'gameId' })
  };
  return Game;
};
