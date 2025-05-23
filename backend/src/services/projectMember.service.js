const { Project, User, ProjectMember } = require('../models/');
const handleTransaction = require('../utils/handleTransaction');
const {
  verifyProjectExists,
  verifyUserExists,
  verifyProjectMemberExists,
  verifyManyUsersExists,
  verifyConflictMembers,
} = require('../validations');
const { notifyMany } = require('./notification.service');

const getProjectMembers = async ({ projectId }) => {
  return handleTransaction(async (transaction) => {
    await verifyProjectExists({ projectId, transaction });

    const project = await Project.findByPk(
      projectId,
      {
        include: [
          {
            model: User,
            as: 'members',
            through: { attributes: ['role'] },
            attributes: { exclude: ['passwordHash'] },
          },
        ],
      },
      transaction
    );

    const { members } = project.get({ plain: true });

    if (members.length === 0) {
      return {
        count: members.length,
        members,
      };
    }

    const formattedMembers = members.map(({ ProjectMember, ...member }) => ({
      ...member,
      role: ProjectMember.role,
    }));

    return { count: formattedMembers.length, members: formattedMembers };
  });
};

const getProjectsByUser = async ({ userId }) => {
  return handleTransaction(async (transaction) => {
    await verifyUserExists({ userId, transaction });

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Project,
          as: 'memberProjects',
          through: { attributes: ['role'] },
        },
      ],
      transaction,
    });

    const { memberProjects } = user.get({ plain: true });

    const formattedProjects = memberProjects.map(
      ({ ProjectMember, ...project }) => ({
        ...project,
        role: ProjectMember.role,
      })
    );

    return { count: memberProjects.length, projects: formattedProjects };
  });
};

const addProjectMembers = async ({ projectId, assignedById, members }) => {
  return handleTransaction(async (transaction) => {
    await verifyProjectExists({ projectId, transaction });
    await verifyManyUsersExists({ members, transaction });
    await verifyProjectMemberExists({
      projectId,
      userId: assignedById,
      transaction,
    });
    await verifyConflictMembers({ members, projectId, transaction });

    const addedMembers = await ProjectMember.bulkCreate(
      members.map((member) => ({
        projectId,
        userId: member.userId,
        role: member.role || 'member',
      })),
      { transaction }
    );

    notifyMany({
      userIds: members.map((member) => member.userId),
      type: 'PROJECT_ASSIGNED',
      message: 'You have been added to a project.',
      metadata: { projectId, assignedById },
    });

    return { addedMembers };
  });
};

const removeProjectMember = async ({ projectId, memberId }) => {
  return handleTransaction(async (transaction) => {
    await Promise.all([
      verifyProjectExists({ projectId, transaction }),
      verifyUserExists({ userId: memberId, transaction }),
      verifyProjectMemberExists({ projectId, userId: memberId, transaction }),
    ]);

    const deletedCount = await ProjectMember.destroy({
      where: { projectId, userId: memberId },
      transaction,
    });

    return { count: deletedCount };
  });
};

const updateProjectMemberRole = async ({ projectId, memberId, role }) => {
  return handleTransaction(async (transaction) => {
    await verifyProjectExists({ projectId, transaction });
    await verifyProjectMemberExists({
      projectId,
      userId: memberId,
      transaction,
    });

    const [affectedRows] = await ProjectMember.update(
      { role },
      {
        where: { userId: memberId, projectId },
        transaction,
      }
    );

    return { affectedRows };
  });
};

module.exports = {
  getProjectMembers,
  addProjectMembers,
  getProjectsByUser,
  updateProjectMemberRole,
  removeProjectMember,
};
