const { commentService } = require('../services');

const getAllTaskComments = async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const data = await commentService.getAllTaskComments(Number(taskId));
    res.status(200).json({ message: 'Tasks comments listed.', data });
  } catch (error) {
    next(error);
  }
};

const getCommentsByUserId = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const data = await commentService.getCommentsByUserId(Number(userId));
    res.status(200).json({ message: 'User comments listed.', data });
  } catch (error) {
    next(error);
  }
};

const createComment = async (req, res, next) => {
  const { taskId } = req.params;
  const { content } = req.body;
  const { id: authorId } = req.user;
  try {
    const data = await commentService.createComment({
      taskId: Number(taskId),
      authorId: Number(authorId),
      content,
    });
    res.status(201).json({ message: 'Task comment created.', data });
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const { id: userId } = req.user;
  try {
    const data = await commentService.updateComment({
      commentId: Number(commentId),
      userId: Number(userId),
      content,
    });
    res.status(200).json({ message: 'Task comment updated.', data });
  } catch (error) {
    next(error);
  }
};

const removeComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { id: userId } = req.user;
  try {
    const data = await commentService.removeComment({
      commentId: Number(commentId),
      userId: Number(userId),
    });
    res.status(200).json({ message: 'Task comment removed.', data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTaskComments,
  getCommentsByUserId,
  createComment,
  updateComment,
  removeComment,
};
