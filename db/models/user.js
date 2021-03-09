'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    userName: {
      allowNull: false,
      type: DataTypes.STRING(50),
      unique: true
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(255),
      unique: true
    },
    hashPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY
    },
    bio: {
      type: DataTypes.TEXT
    },
  }, {});
  User.associate = function(models) {
    User.hasMany(models.GameShelf, { foreignKey: 'userId' })
    User.hasMany(models.Review, { foreignKey: 'userId' })
    User.hasMany(models.Rating, { foreignKey: 'userId' })
  };
  return User;
};
