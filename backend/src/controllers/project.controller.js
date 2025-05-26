const { projectService, projectMemberService } = require('../services');

const getAllProjects = async (req, res, next) => {
  const { createdBy } = req.query;
  try {
    const data = await projectService.getAllProjects({ createdBy });
    return res.status(200).json({ message: 'Projects listed.', data });
  } catch (error) {
    next(error);
  }
};

const getProjectMembers = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const data = await projectMemberService.getProjectMembers({
      projectId: Number(projectId),
    });
    return res.status(200).json({ message: 'Members listed.', data });
  } catch (error) {
    next(error);
  }
};

const findOneProject = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const data = await projectService.findOneProject({
      projectId: Number(projectId),
    });
    return res.status(200).json({ message: 'Project found.', data });
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  const { id: userId } = req.user;
  const projectData = req.body;
  try {
    const data = await projectService.insertProject({
      projectData,
      userId: Number(userId),
    });
    return res.status(201).json({ message: 'Project created.', data });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  const projectData = req.body;
  const { projectId } = req.params;
  const { id: userId } = req.user;
  try {
    const data = await projectService.updateProject({
      projectData,
      projectId: Number(projectId),
      userId: Number(userId),
    });
    return res.status(200).json({ message: 'Project updated.', data });
  } catch (error) {
    next(error);
  }
};

const removeProject = async (req, res, next) => {
  const { projectId } = req.params;
  const { id: userId } = req.user;
  try {
    const data = await projectService.removeProject({
      projectId: Number(projectId),
      userId: Number(userId),
    });
    return res.status(200).json({ message: 'Project removed.', data });
  } catch (error) {
    next(error);
  }
};

const addProjectMembers = async (req, res, next) => {
  const { projectId } = req.params;
  const members = req.body;
  const { id: assignedById } = req.user;
  try {
    const data = await projectMemberService.addProjectMembers({
      projectId: Number(projectId),
      assignedById: Number(assignedById),
      members,
    });
    return res.status(201).json({ message: 'Members added.', data });
  } catch (error) {
    next(error);
  }
};

const getProjectsByUserId = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const data = await projectMemberService.getProjectsByUser({
      userId: Number(userId),
    });
    return res.status(200).json({ message: 'Projects listed.', data });
  } catch (error) {
    next(error);
  }
};

const removeProjectMember = async (req, res, next) => {
  const { projectId, memberId } = req.params;
  try {
    const data = await projectMemberService.removeProjectMember({
      projectId: Number(projectId),
      memberId: Number(memberId),
    });
    return res.status(200).json({ message: 'Member removed.', data });
  } catch (error) {
    next(error);
  }
};

const updateProjectMemberRole = async (req, res, next) => {
  const { projectId, memberId } = req.params;
  const { role } = req.body;
  try {
    const data = await projectMemberService.updateProjectMemberRole({
      projectId: Number(projectId),
      memberId: Number(memberId),
      role,
    });
    return res.status(200).json({ message: 'Role updated.', data });
  } catch (error) {
    next(error);
  }
};

const getProjectTasks = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const data = await projectService.getProjectTasks({
      projectId: Number(projectId),
    });
    res.status(200).json({ message: 'Project tasks listed.', data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProjects,
  getProjectMembers,
  createProject,
  findOneProject,
  updateProject,
  removeProject,
  addProjectMembers,
  getProjectsByUserId,
  updateProjectMemberRole,
  removeProjectMember,
  getProjectTasks,
};
