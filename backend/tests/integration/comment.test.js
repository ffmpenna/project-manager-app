const app = require('../../src/app');
const request = require('supertest');
const chaiHttp = require('chai-http');
const { expect, use } = require('chai');
const { Comment, Project, User, ProjectMember, Task } = require('../../src/models');
const {
  mockProject,
  mockUser,
  mockProjectMember,
  mockTask,
  mockComment,
} = require('../helpers/');
const { expectCommentShape } = require('../helpers/expectShape');
const { createTestContext, cleanupTestData } = require('../helpers/testContext');

use(chaiHttp);

describe('Comment Routes', () => {
  const DEFAULT_LENGHT = 10;
  const NON_EXISTENT_ID = 99999;
  const INVALID_ID = 'invalid_id';

  let test;

  beforeEach(async () => {
    await cleanupTestData();
    test = await createTestContext();
  });

  describe('SUCCESS CASES', () => {
    describe('GET /tasks/:taskId/comments/', () => {
      it('should find all task comments', async () => {
        const response = await request(app)
          .get(`/tasks/${test.tasks[0].id}/comments/`)
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(200);
        response.body.data.comments.forEach((comment) => expectCommentShape(comment));
        expect(response.body.data.comments).to.have.lengthOf(DEFAULT_LENGHT);
      });
    });

    describe('POST /tasks/:taskId/comments', () => {
      it('should create a task comment', async () => {
        const content = 'Test comment';

        const response = await request(app)
          .post(`/tasks/${test.tasks[0].id}/comments`)
          .set('Authorization', `Bearer ${test.token}`)
          .send({ content });

        expect(response.status).to.equal(201);
        expect(response.body.message).to.include('comment created');

        expectCommentShape(response.body.data.comment);
        expect(response.body.data.comment).to.include({
          taskId: test.tasks[0].id,
          content,
        });
      });
    });
    describe('PUT /tasks/:taskId/comments/:commentId', () => {
      it('should update a task comment', async () => {
        const updatedComment = { content: 'Updated comment' };
        const response = await request(app)
          .put(`/tasks/${test.tasks[0].id}/comments/${test.comments[0].id}`)
          .set('Authorization', `Bearer ${test.token}`)
          .send(updatedComment);

        expect(response.status).to.equal(200);
        expect(response.body.message).to.include('comment updated');
        expect(response.body.data.affectedRows).to.equal(1);
      });
    });
    describe('DELETE /tasks/:taskId/comments/:commentId', () => {
      it('should delete a task comment', async () => {
        const response = await request(app)
          .delete(`/tasks/${test.tasks[0].id}/comments/${test.comments[0].id}`)
          .set('Authorization', `Bearer ${test.token}`);
        const checkRemoval = await Comment.findByPk(test.comments[0].id);

        expect(response.status).to.equal(200);
        expect(response.body.message).to.include('comment removed');
        expect(response.body.data.deletedCount).to.equal(1);
        expect(checkRemoval).to.be.null;
      });
    });
  });

  describe('ERROR CASES', () => {
    describe('POST /tasks/:taskId/comments', () => {
      it('should return 400 if content is missing', async () => {
        const response = await request(app)
          .post(`/tasks/${test.tasks[0].id}/comments`)
          .set('Authorization', `Bearer ${test.token}`)
          .send({});

        expect(response.status).to.equal(400);
        expect(response.body.message).to.include('"content" is required');
      });

      it('should return 403 if user is not a project member', async () => {
        const content = 'Test comment';
        const project = await Project.create(mockProject(test.user.id));
        const task = await Task.create(mockTask(project.id));
        const response = await request(app)
          .post(`/tasks/${task.get('id')}/comments`)
          .set('Authorization', `Bearer ${test.token}`)
          .send({ content });

        expect(response.status).to.equal(403);
        expect(response.body.message).to.include('is not a member of project');
      });
    });

    describe('PUT /tasks/:taskId/comments/:commentId', () => {
      it('should return 404 if comment does not exist', async () => {
        const updatedComment = { content: 'Updated comment' };
        const response = await request(app)
          .put(`/tasks/${test.tasks[0].id}/comments/${NON_EXISTENT_ID}`)
          .set('Authorization', `Bearer ${test.token}`)
          .send(updatedComment);

        expect(response.status).to.equal(404);
        expect(response.body.message).to.include('not found');
      });

      it('should return 400 if content is missing', async () => {
        const response = await request(app)
          .put(`/tasks/${test.tasks[0].id}/comments/${test.comments[0].id}`)
          .set('Authorization', `Bearer ${test.token}`)
          .send({});

        expect(response.status).to.equal(400);
        expect(response.body.message).to.include('"content" is required');
      });
    });

    describe('DELETE /tasks/:taskId/comments/:commentId', () => {
      it('should return 404 if comment does not exist', async () => {
        const response = await request(app)
          .delete(`/tasks/${test.tasks[0].id}/comments/${NON_EXISTENT_ID}`)
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(404);
        expect(response.body.message).to.include('not found');
      });
    });
  });
});
