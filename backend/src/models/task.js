module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      title: DataTypes.STRING(100),
      projectId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      status: {
        type: DataTypes.ENUM('to_do', 'in_progress', 'done'),
        defaultValue: 'to_do',
      },
      assignedTo: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      dueDate: DataTypes.DATE,
    },
    {
      timestamps: false,
      underscored: true,
    },
  );
  Task.associate = (models) => {
    Task.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
    Task.belongsTo(models.User, { foreignKey: 'assignedTo', as: 'assignee' });
    Task.hasMany(models.Comment, {
      foreignKey: 'taskId',
      as: 'comments',
    });
  };
  return Task;
};
