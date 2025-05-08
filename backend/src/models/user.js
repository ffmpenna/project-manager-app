module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING(100),
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      passwordHash: DataTypes.STRING(255),
    },
    {
      timestamps: false,
      underscored: true,
    },
  );

  User.associate = (models) => {
    User.hasMany(models.Project, {
      foreignKey: 'createdBy',
      as: 'projects',
    });
    User.hasMany(models.Task, {
      foreignKey: 'assignedTo',
      as: 'tasks',
    });
    User.hasMany(models.Comment, {
      foreignKey: 'author',
      as: 'comments',
    });
  };

  return User;
};
