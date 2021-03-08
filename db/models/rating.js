'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
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
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  }, {});
  Rating.associate = function(models) {
    Rating.belongsTo(model.User, { foreignKey: 'userId'})
    Rating.belongsTo(model.Game, { foreignKey: 'gameId'})
  };
  return Rating;
};