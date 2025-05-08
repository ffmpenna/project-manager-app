module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      type: {
        type: DataTypes.ENUM(
          'COMMENT',
          'TASK_ASSIGNED',
          'TASK_COMPLETED',
          'PROJECT_ASSIGNED',
        ),
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      metadata: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      underscored: true,
    },
  );

  Notification.associate = (models) => {
    Notification.belongsToMany(models.User, {
      through: models.UserNotification,
      foreignKey: 'notificationId',
      otherKey: 'userId',
    });
  };

  return Notification;
};
