module.exports = (sequelize, DataTypes) => {
  const ProjectMember = sequelize.define(
    'ProjectMember',
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      projectId: {
        type: DataTypes.INTEGER,
      },
      role: {
        type: DataTypes.ENUM('member', 'admin'),
        defaultValue: 'member',
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'projects_members',
    },
  );

  ProjectMember.associate = (models) => {
    models.Project.belongsToMany(models.User, {
      through: ProjectMember,
      foreignKey: 'projectId',
      otherKey: 'userId',
      as: 'members',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    models.User.belongsToMany(models.Project, {
      through: ProjectMember,
      foreignKey: 'userId',
      otherKey: 'projectId',
      as: 'memberProjects',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return ProjectMember;
};
