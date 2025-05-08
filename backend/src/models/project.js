module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    'Project',
    {
      title: DataTypes.STRING(100),
      description: DataTypes.TEXT,
      createdBy: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
    },
  );

  Project.associate = (models) => {
    Project.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'creator',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Project.hasMany(models.Task, {
      foreignKey: 'projectId',
      as: 'tasks',
    });
  };

  return Project;
};
