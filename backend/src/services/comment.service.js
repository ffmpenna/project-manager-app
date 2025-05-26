const handleTransaction = require('../utils/handleTransaction');
const {
  verifyTaskExists,
  verifyCommentExists,
  verifyProjectMemberExists,
  verifyCommentBelongsToUser,
  verifyUserExists,
} = require('../validations');
const { Comment, User } = require('../models');
const { notifyMany } = require('./notification.service');

const getAllTaskComments = async (taskId) => {
  return handleTransaction(async (transaction) => {
    // Verify that the task exists and the user is a member of the project.
    await verifyTaskExists({ taskId, transaction });

    // Fetch all comments for the task, including user details.
    const comments = await Comment.findAll({
      where: {
        taskId,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
      transaction,
    });

    return { count: comments.length, comments };
  });
};

const getCommentsByUserId = async (userId) => {
  return handleTransaction(async (transaction) => {
    // Verify that the user exists.
    await verifyUserExists({ userId, transaction });

    // Fetch all comments made by the user, including task details.
    const comments = await Comment.findAll({
      where: { author: userId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
      transaction,
    });
    return { count: comments.length, comments };
  });
};

const createComment = async ({ taskId, authorId, content }) => {
  return handleTransaction(async (transaction) => {
    // Verify that the task exists and the user is a member of the project.
    const { task } = await verifyTaskExists({ taskId, transaction });
    const projectId = task.get('projectId');
    await verifyProjectMemberExists({
      projectId,
      userId: authorId,
      transaction,
    });

    const comment = await Comment.create({
      taskId,
      author: authorId,
      content,
    });

    // Notify the user assigned to the task about the new comment.
    await notifyMany({
      userIds: [task.get('assignedTo')],
      type: 'COMMENT',
      message: `New comment on task ${taskId}`,
      metadata: {
        taskId,
        projectId,
        commentId: comment.id,
        authorId,
      },
    });
    return { comment };
  });
};

const updateComment = async ({ commentId, userId, content }) => {
  return handleTransaction(async (transaction) => {
    // Verify that the comment exists and belongs to the user.
    await Promise.all([
      verifyCommentExists({ commentId, transaction }),
      verifyCommentBelongsToUser({ commentId, userId, transaction }),
    ]);

    const [affectedRows] = await Comment.update(
      { content },
      { where: { id: commentId }, transaction }
    );
    return { affectedRows };
  });
};

const removeComment = async ({ commentId, userId }) => {
  return handleTransaction(async (transaction) => {
    // Verify that the comment exists and belongs to the user.
    await Promise.all([
      verifyCommentExists({ commentId, transaction }),
      verifyCommentBelongsToUser({ commentId, userId, transaction }),
    ]);

    const deletedCount = await Comment.destroy({
      where: { id: commentId },
      transaction,
    });

    return { deletedCount };
  });
};

module.exports = {
  getAllTaskComments,
  getCommentsByUserId,
  createComment,
  updateComment,
  removeComment,
};
