const { faker } = require('@faker-js/faker');
const { User } = require('../../src/models');

const mockProject = (userId, number = 1) => {
  const createSingleProject = () => ({
    title: faker.lorem.sentence(5),
    description: faker.lorem.paragraph(2),
    createdBy: userId,
  });
  if (number === 1) return createSingleProject();
  return Array.from({ length: number }, createSingleProject);
};

const mockUser = (number = 1) => {
  const createSingleUser = () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    passwordHash: '$2b$12$' + faker.string.alphanumeric(56),
  });
  if (number === 1) return createSingleUser();
  return Array.from({ length: number }, createSingleUser);
};

const mockRegisterUser = (number = 1) => {
  const createSingleUser = () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ prefix: '#Aa1', length: 15 }),
  });
  if (number === 1) return createSingleUser();
  return Array.from({ length: number }, createSingleUser);
};

const mockProjectMember = (membersIds) => {
  const projectMembers = membersIds.map((member) => ({
    userId: member,
    role: 'member',
  }));

  return projectMembers;
};

const mockTask = (projectId, number = 1) => {
  const createSingleTask = () => ({
    projectId,
    title: `${faker.word.adverb()} ${faker.word.verb()} a ${faker.word.adjective()} ${faker.word.noun()}`,
    description: faker.lorem.paragraph(1),
    dueDate: faker.date.soon({ days: 7 }),
  });
  if (number === 1) return createSingleTask();
  return Array.from({ length: number }, createSingleTask);
};

const mockComment = (taskId, userId, number = 1) => {
  const createSingleComment = () => ({
    taskId,
    author: userId,
    content: faker.lorem.paragraph(1),
  });
  if (number === 1) return createSingleComment();
  return Array.from({ length: number }, createSingleComment);
};

const createUser = () => User.create(mockUser());
const createUsers = (n) => User.bulkCreate(mockUser(n));

module.exports = {
  mockUser,
  mockRegisterUser,
  mockProject,
  mockProjectMember,
  mockTask,
  mockComment,
  createUser,
  createUsers,
};
