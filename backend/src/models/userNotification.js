module.exports = (sequelize, DataTypes) => {
  const UserNotification = sequelize.define(
    'UserNotification',
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      notificationId: {
        type: DataTypes.INTEGER,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      readAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'user_notifications',
    },
  );

  UserNotification.associate = (models) => {
    UserNotification.belongsTo(models.User, { foreignKey: 'userId' });
    UserNotification.belongsTo(models.Notification, {
      foreignKey: 'notificationId',
      as: 'notification',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return UserNotification;
};
