const task = require('./task');

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      content: DataTypes.TEXT,
      taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      author: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      underscored: true,
    },
  );

  Comment.associate = (models) => {
    models.Comment.belongsTo(models.User, {
      foreignKey: 'author',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    models.Comment.belongsTo(models.Task, {
      foreignKey: 'taskId',
      as: 'task',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Comment;
};
