const { ProjectMember } = require('../models');
const { ConflictError, ForbiddenError } = require('../utils/CustomErrors');
const { verifyUserExists } = require('./userValidations');

const verifyProjectMemberExists = async ({ projectId, userId, transaction }) => {
  await verifyUserExists({ userId, transaction });
  const member = await ProjectMember.findOne({
    where: { projectId, userId },
    transaction,
  });

  if (!member) {
    throw new ForbiddenError(`User ${userId} is not a member of project ${projectId}`);
  }
};

const verifyConflictMembers = async ({ members, projectId, transaction }) => {
  const userIds = members.map((m) => m.userId);
  const conflictedMembers = await ProjectMember.findAll({
    where: { projectId, userId: userIds },
    transaction,
  });

  if (conflictedMembers.length > 0) {
    throw new ConflictError(`Users already in project ${projectId}`, {
      conflictingIds: conflictedMembers.map((m) => m.userId),
    });
  }
};

module.exports = { verifyProjectMemberExists, verifyConflictMembers };
