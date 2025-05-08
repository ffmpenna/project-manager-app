const { Comment } = require('../models');
const { ForbiddenError } = require('../utils/CustomErrors');
const verifyEntityExists = require('../utils/verifyEntityExists');

const verifyCommentExists = ({ commentId, transaction }) =>
  verifyEntityExists({
    id: commentId,
    model: Comment,
    entityName: 'Comment',
    transaction,
  });

const verifyCommentBelongsToUser = async ({ commentId, userId, transaction }) => {
  const comment = await Comment.findByPk(commentId, { transaction });
  if (comment.get('author') !== userId) {
    throw new ForbiddenError(`Comment ${commentId} does not belong to user ${userId}`);
  }
  return comment;
};

module.exports = {
  verifyCommentExists,
  verifyCommentBelongsToUser,
};
