'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Games' }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Rating.associate = function(models) {
    // Rating.belongsTo(models.User, { foreignKey: 'userId'})
    // Rating.belongsTo(models.Game, { foreignKey: 'gameId'})
  };
  return Rating;
};
