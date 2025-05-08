const { Project } = require('../models');
const { ForbiddenError } = require('../utils/CustomErrors');
const verifyEntityExists = require('../utils/verifyEntityExists');

const verifyProjectExists = ({ projectId, transaction }) =>
  verifyEntityExists({
    id: projectId,
    model: Project,
    entityName: 'Project',
    transaction,
  });

const verifyProjectOwnership = async ({ ownerId, userId }) => {
  if (ownerId !== userId) {
    throw new ForbiddenError('You are not allowed to update this project');
  }
};

module.exports = {
  verifyProjectExists,
  verifyProjectOwnership,
};
