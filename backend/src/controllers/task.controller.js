const { taskService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createTask = async (req, res, next) => {
  try {
    const taskData = req.body;
    const { projectId } = req.params;
    const { id: userId } = req.user;
    const data = await taskService.createTask({
      userId: Number(userId),
      projectId: Number(projectId),
      taskData,
    });
    return res.status(201).json({ message: 'Task created.', data });
  } catch (error) {
    next(error);
  }
};

const findOneTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const data = await taskService.findOneTask({ taskId: Number(taskId) });
    return res.status(200).json({ message: 'Task found.', data });
  } catch (error) {
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const data = await taskService.getAllTasks();
    return res.status(200).json({ message: 'Tasks listed.', data });
  } catch (error) {
    next(error);
  }
};

const getTasksByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = await taskService.getTasksByUser({ userId: Number(userId) });
    return res.status(200).json({ message: 'User tasks listed.', data });
  } catch (error) {
    next(error);
  }
};

const removeTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { id: userId } = req.user;
    const data = await taskService.removeTask({
      taskId: Number(taskId),
      userId: Number(userId),
    });
    return res.status(200).json({ message: 'Task removed.', data });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { id: userId } = req.user;
    const taskData = req.body;
    const data = await taskService.updateTask({
      userId: Number(userId),
      taskId: Number(taskId),
      taskData,
    });
    return res.status(200).json({ message: 'Task updated.', data });
  } catch (error) {
    next(error);
  }
};

const patchTaskStatus = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { value } = req.query;
    const { id: userId } = req.user;

    const data = await taskService.patchTaskStatus({
      userId: Number(userId),
      taskId: Number(taskId),
      value,
    });
    return res.status(200).json({ message: 'Task status updated.', data });
  } catch (error) {
    next(error);
  }
};

const assignMemberToTask = async (req, res, next) => {
  try {
    const { userId: assignedToId } = req.body;
    const { taskId } = req.params;
    const { id: assignedById } = req.user;
    const data = await taskService.assignMemberToTask({
      assignedToId: Number(assignedToId),
      assignedById: Number(assignedById),
      taskId: Number(taskId),
    });
    return res.status(200).json({ message: 'Member assigned to task.', data });
  } catch (error) {
    next(error);
  }
};

const unassignTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { id: userId } = req.user;
    const data = await taskService.unassignTask({
      userId: Number(userId),
      taskId: Number(taskId),
    });
    return res.status(200).json({ message: 'Task unassigned.', data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  findOneTask,
  getAllTasks,
  getTasksByUser,
  removeTask,
  updateTask,
  patchTaskStatus,
  assignMemberToTask,
  unassignTask,
};
