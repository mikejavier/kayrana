const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    }
  }, {
    paranoid: true
  });

  // User.associate = ({ Contact }) => {
  //   User.hasMany(Contact);
  // };

  User.beforeCreate(user => bcrypt.hash(user.password, 10)
    .then(hash => user.password = hash));

  User.beforeBulkUpdate(user => {
    if (!user.fields.includes('password')) return;

    return bcrypt.hash(user.attributes.password, 10)
      .then(hash => user.attributes.password = hash);
  });
  
  return User;
};  