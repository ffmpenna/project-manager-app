const { Task, ProjectMember } = require('../models/');
const { ForbiddenError } = require('../utils/CustomErrors');
const handleTransaction = require('../utils/handleTransaction');
const {
  verifyProjectExists,
  verifyUserExists,
  assignMemberValidations,
  verifyTaskExists,
  patchTaskStatusValidations,
} = require('../validations');
const { notifyMany } = require('./notification.service');

const createTask = async ({ projectId, taskData }) => {
  return handleTransaction(async (transaction) => {
    await verifyProjectExists({ projectId, transaction });

    const task = await Task.create({ projectId, ...taskData }, { transaction });
    return { task };
  });
};

const findOneTask = async ({ taskId }) => {
  return handleTransaction(async (transaction) => {
    await verifyTaskExists({ taskId, transaction });

    const task = await Task.findByPk(taskId, { transaction });
    return { task };
  });
};

const getAllTasks = async () => {
  return handleTransaction(async (transaction) => {
    const tasks = await Task.findAll({ transaction });
    return { count: tasks.length, tasks };
  });
};

const getTasksByUser = async ({ userId }) => {
  return handleTransaction(async (transaction) => {
    await verifyUserExists({ userId, transaction });

    const tasks = await Task.findAll({ where: { assignedTo: userId }, transaction });
    return { count: tasks.length, tasks };
  });
};

const removeTask = async ({ taskId, userId }) => {
  return handleTransaction(async (transaction) => {
    const { task } = await verifyTaskExists({ taskId, transaction });
    const isMember = await ProjectMember.findOne({
      where: { projectId: task.projectId, userId },
      transaction,
    });

    if (!isMember) {
      throw new ForbiddenError(`Only project members can remove tasks.`);
    }

    const deletedCount = await Task.destroy({ where: { id: taskId }, transaction });
    return { deletedCount };
  });
};

const updateTask = async ({ taskId, taskData }) => {
  return handleTransaction(async (transaction) => {
    await verifyTaskExists({ taskId, transaction });
    const [affectedRows] = await Task.update(taskData, {
      where: { id: taskId },
      transaction,
    });
    return { affectedRows };
  });
};

const patchTaskStatus = async ({ taskId, value }) => {
  return handleTransaction(async (transaction) => {
    await patchTaskStatusValidations({ taskId, value, transaction });

    const [affectedRows] = await Task.update(
      { status: value },
      {
        where: { id: taskId },
        transaction,
      },
    );
    return { affectedRows };
  });
};

const assignMemberToTask = async ({ assignedToId, assignedById, taskId }) => {
  return handleTransaction(async (transaction) => {
    await assignMemberValidations({ userId: assignedToId, taskId, transaction });
    const { projectId } = await Task.findByPk(taskId, { transaction });

    const [affectedRows] = await Task.update(
      { assignedTo: assignedToId },
      {
        where: { id: taskId },
        transaction,
      },
    );

    await notifyMany({
      userIds: [assignedToId],
      type: 'TASK_ASSIGNED',
      message: 'You have been assigned a new task',
      metadata: { taskId, projectId, assignedToId, assignedById },
    });

    return { affectedRows };
  });
};

const unassignTask = async ({ taskId }) => {
  return handleTransaction(async (transaction) => {
    await verifyTaskExists({ taskId, transaction });

    const [affectedRows] = await Task.update(
      { assignedTo: null },
      {
        where: { id: taskId },
        transaction,
      },
    );
    return { affectedRows };
  });
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
