'use strict';
module.exports = (sequelize, DataTypes) => {
  const GameShelf = sequelize.define('GameShelf', {
    category: {
      type: Sequelize.ENUM,
      values: ['Played', 'Playing', 'Wishlist'],
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    gameId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Games' }
    },
  }, {});
  GameShelf.associate = function(models) {
    GameShelf.belongsTo(models.User, { foreignKey: 'userId' })
    GameShelf.belongsTo(models.Game, { foreignKey: 'gameId' })
  };
  return GameShelf;
};