'use strict';
module.exports = (sequelize, DataTypes) => {
  const GameShelf = sequelize.define('GameShelf', {
    category: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER
  }, {});
  GameShelf.associate = function(models) {
    // associations can be defined here
  };
  return GameShelf;
};