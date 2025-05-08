const { expect } = require('chai');

const expectProjectShape = (project, expected = {}) => {
  expect(project).to.include.keys(['id', 'title', 'description', 'createdBy']);
};
const expectTaskShape = (task, keys) => {
  expect(task).to.include.keys([
    'id',
    'projectId',
    'title',
    'description',
    'status',
    'dueDate',
    'assignedTo',
  ]);
};

const expectCommentShape = (comment) => {
  expect(comment).to.include.keys(['id', 'taskId', 'author', 'content']);
};

module.exports = { expectProjectShape, expectTaskShape, expectCommentShape };
