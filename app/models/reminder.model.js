module.exports = (sequelize, DataTypes) => {
  const Reminder = sequelize.define('reminder', {
    user: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  });

  return Reminder;
};
