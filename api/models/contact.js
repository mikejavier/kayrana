module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    lastName: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true }
    },
    photo: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    }
  });

  // Contact.associate = ({ User }) => {
  //   Contact.hasOne(User);
  // };

  return Contact;
};