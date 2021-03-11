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
    image: {
      allowNull: false,
      type: DataTypes.STRING(200)
    },
  }, {});

  const gameShelfMapping = {
    through: 'GameShelf', // This is the model name referencing the join table.
    otherKey: 'userId',
    foreignKey: 'gameId'
  }

  const reviewMapping = {
    through: 'Review',
    otherKey: 'userId',
    foreignKey: 'gameId'
  }

  const ratingMapping = {
    through: 'Rating',
    otherKey: 'userId',
    foreignKey: 'gameId'
  }

  Game.associate = function(models) {
    // Game.hasMany(models.Review, { foreignkey: 'gameId' })
    // Game.hasMany(models.Rating, { foreignkey: 'gameId' })
    // Game.hasMany(models.GameShelf, { foreignkey: 'gameId' })
    Game.belongsToMany(models.User, gameShelfMapping)
    Game.belongsToMany(models.User, reviewMapping)
    Game.belongsToMany(models.User, ratingMapping)
  };
  return Game;
};
