const app = require('../../src/app');
const request = require('supertest');
const chaiHttp = require('chai-http');
const { expect, use } = require('chai');
const { ProjectMember, Task } = require('../../src/models');
const { mockTask, createUser } = require('../helpers/');
const { expectTaskShape } = require('../helpers/expectShape');
const { cleanupTestData, createTestContext } = require('../helpers/testContext');

use(chaiHttp);

describe('Task Routes', () => {
  const DEFAULT_LENGHT = 10;
  const NON_EXISTENT_ID = 99999;
  const INVALID_ID = 'invalid_id';
  let test;

  const insertProjectMember = async (userId, projectId) =>
    await ProjectMember.create({ userId, projectId });

  beforeEach(async () => {
    await cleanupTestData();
    test = await createTestContext();
  });

  describe('SUCCESS CASES', () => {
    describe('GET /tasks/:taskId', () => {
      it('should find a task', async () => {
        const response = await request(app)
          .get(`/tasks/${test.tasks[0].id}`)
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(200);
        expectTaskShape(response.body.data.task);
      });
    });

    describe('GET /tasks/', () => {
      it('should list all tasks', async () => {
        const response = await request(app)
          .get(`/tasks`)
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(200);
        response.body.data.tasks.forEach((task) => expectTaskShape(task));
        expect(response.body.data.tasks).to.have.lengthOf(DEFAULT_LENGHT);
      });
    });

    describe('GET /projects/:projectId/tasks', () => {
      it('should list all tasks from a project', async () => {
        const response = await request(app)
          .get(`/projects/${test.projects[0].id}/tasks`)
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(200);

        response.body.data.tasks.forEach((task) => expectTaskShape(task));

        expect(response.body.data.tasks).to.have.lengthOf(DEFAULT_LENGHT);
        expect(response.body.data.count).to.equal(DEFAULT_LENGHT);
      });
    });

    describe('GET /users/:userId/tasks', () => {
      beforeEach(async () => {
        for (const task of test.tasks) {
          await Task.update({ assignedTo: test.user.id }, { where: { id: task.id } });
        }
      });

      it('should list only tasks assigned to a user', async () => {
        const response = await request(app)
          .get(`/users/${test.user.id}/tasks`)
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(200);

        response.body.data.tasks.forEach((task) => expectTaskShape(task));
        response.body.data.tasks.forEach((task) =>
          expect(task.assignedTo).to.equal(test.user.id),
        );

        expect(response.body.data.tasks).to.have.lengthOf(DEFAULT_LENGHT);
      });
    });
    describe('POST /tasks/projects/:projectId', () => {
      it('should create a project task', async () => {
        const { projectId, ...taskBody } = mockTask(test.projects[0].id);
        const response = await request(app)
          .post(`/projects/${test.projects[0].id}/tasks`)
          .send(taskBody)
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(201);
        expectTaskShape(response.body.data.task);
        expect(response.body.data.task.projectId).to.equal(test.projects[0].id);
        expect(response.body.data.task.title).to.equal(taskBody.title);
      });
    });

    describe('DELETE /tasks/:taskId', () => {
      it('should remove a project task', async () => {
        const response = await request(app)
          .delete(`/tasks/${test.tasks[0].id}`)
          .set('Authorization', `Bearer ${test.token}`);
        const checkRemoval = await Task.findByPk(test.tasks[0].id);

        expect(response.status).to.equal(200);
        expect(response.body.message).to.match(/task removed/i);
        expect(response.body.data.deletedCount).to.equal(1);
        expect(checkRemoval).to.be.null;
      });
    });

    describe('PUT /tasks/:taskId', () => {
      it('should update a project task', async () => {
        const update = { title: 'new title', description: 'new description' };

        const response = await request(app)
          .put(`/tasks/${test.tasks[0].id}`)
          .send(update)
          .set('Authorization', `Bearer ${test.token}`);

        const checkUpdate = await Task.findByPk(test.tasks[0].id);

        expect(response.status).to.equal(200);
        expect(response.body.message).to.match(/task updated/i);
        expect(response.body.data.affectedRows).to.be.greaterThan(0);

        expect(checkUpdate).to.include(update);
      });
    });

    describe('PATCH /tasks/:taskId/status?value=', () => {
      it('should set task status to "to_do"', async () => {
        const response = await request(app)
          .patch(`/tasks/${test.tasks[0].id}/status?value=to_do`)
          .set('Authorization', `Bearer ${test.token}`);

        const checkStatus = await Task.findByPk(test.tasks[0].id);

        expect(response.status).to.equal(200);
        expect(response.body.message).to.match(/Task status updated./i);

        expect(checkStatus.get('status')).to.equal('to_do');
      });
      it('should set task status to "in_progress"', async () => {
        const response = await request(app)
          .patch(`/tasks/${test.tasks[0].id}/status?value=in_progress`)
          .set('Authorization', `Bearer ${test.token}`);

        const checkStatus = await Task.findByPk(test.tasks[0].id);

        expect(response.status).to.equal(200);
        expect(response.body.message).to.match(/Task status updated./i);

        expect(checkStatus.get('status')).to.equal('in_progress');
      });
      it('should set task status to "done"', async () => {
        const response = await request(app)
          .patch(`/tasks/${test.tasks[0].id}/status?value=done`)
          .set('Authorization', `Bearer ${test.token}`);

        const checkStatus = await Task.findByPk(test.tasks[0].id);

        expect(response.status).to.equal(200);
        expect(response.body.message).to.match(/Task status updated./i);

        expect(checkStatus.get('status')).to.equal('done');
      });
    });
    describe('PATCH /tasks/:taskId/assign|unassign', () => {
      it('should assign a member to a project task', async () => {
        await insertProjectMember(test.user.id, test.projects[0].id);

        const response = await request(app)
          .patch(`/tasks/${test.tasks[0].id}/assign`)
          .send({ userId: test.user.id })
          .set('Authorization', `Bearer ${test.token}`);

        const checkAssign = await Task.findByPk(test.tasks[0].id);

        expect(response.status).to.equal(200);
        expect(response.body.message).to.match(/Member assigned to task./i);

        expect(checkAssign.get('assignedTo')).to.equal(test.user.id);
      });

      it('should assign a member to a project task', async () => {
        await insertProjectMember(test.user.id, test.projects[0].id);

        await Task.update(
          { assignedTo: test.user.id },
          { where: { id: test.tasks[0].id } },
        );

        const checkAssign = await Task.findByPk(test.tasks[0].id);

        const response = await request(app)
          .patch(`/tasks/${test.tasks[0].id}/unassign`)
          .send()
          .set('Authorization', `Bearer ${test.token}`);

        const checkUnassign = await Task.findByPk(test.tasks[0].id);

        expect(checkAssign.assignedTo).to.be.equal(test.user.id);
        expect(checkUnassign.assignedTo).to.be.null;
        expect(response.status).to.equal(200);
        expect(response.body.message).to.match(/Task unassigned/i);

        expect(checkAssign.get('assignedTo')).to.equal(test.user.id);
      });
    });
  });

  describe('ERROR CASES', () => {
    describe('POST /projects/:projectId/tasks - createTask', () => {
      it('should return 400 if title is missing', async () => {
        const res = await request(app)
          .post(`/projects/${test.tasks[0].id}/tasks`)
          .send({})
          .set('Authorization', `Bearer ${test.token}`);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.include('title');
      });

      it('should return 400 if dueDate is not a future date', async () => {
        const res = await request(app)
          .post(`/projects/${test.tasks[0].id}/tasks`)
          .send({ title: 'Test', dueDate: '2000-01-01' })
          .set('Authorization', `Bearer ${test.token}`);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.match(/dueDate.*must be greater/i);
      });

      it('should return 404 if project does not exist', async () => {
        const res = await request(app)
          .post(`/projects/${NON_EXISTENT_ID}/tasks`)
          .send({ title: 'Test Task' })
          .set('Authorization', `Bearer ${test.token}`);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.match(/project .* not found/i);
      });
    });
    describe('GET /tasks/:taskId - findOneTask', () => {
      it('should return 400 if taskId is not a number', async () => {
        const res = await request(app)
          .get(`/tasks/${INVALID_ID}`)
          .set('Authorization', `Bearer ${test.token}`);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.match(/task id must be a number/i);
      });

      it('should return 404 if task does not exist', async () => {
        const res = await request(app)
          .get(`/tasks/${NON_EXISTENT_ID}`)
          .set('Authorization', `Bearer ${test.token}`);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.match(/task .* not found/i);
      });
    });

    describe('GET /projects/:projectId/tasks - getProjectTasks', () => {
      it('should return 400 if projectId is not a number', async () => {
        const res = await request(app)
          .get(`/projects/${INVALID_ID}/tasks`)
          .set('Authorization', `Bearer ${test.token}`);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.match(/project id must be a number/i);
      });

      it('should return 404 if project does not exist', async () => {
        const res = await request(app)
          .get(`/projects/${NON_EXISTENT_ID}/tasks`)
          .set('Authorization', `Bearer ${test.token}`);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.match(/project .* not found/i);
      });
    });

    describe('GET /users/:userId/tasks - getMemberTasks', () => {
      it('should return 400 if userId is not valid', async () => {
        const res = await request(app)
          .get(`/users/${INVALID_ID}/tasks`)
          .set('Authorization', `Bearer ${test.token}`);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.match(/user id must be a number/i);
      });

      it('should return 404 if user does not exist', async () => {
        const res = await request(app)
          .get(`/users/${NON_EXISTENT_ID}/tasks`)
          .set('Authorization', `Bearer ${test.token}`);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.match(/user .* not found/i);
      });
    });

    describe('DELETE /tasks/:taskId - removeTask', () => {
      it('should return 400 if taskId is invalid', async () => {
        const res = await request(app)
          .delete(`/tasks/${INVALID_ID}`)
          .set('Authorization', `Bearer ${test.token}`);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.match(/task id must be a number/i);
      });

      it('should return 404 if task does not exist', async () => {
        const res = await request(app)
          .delete(`/tasks/${NON_EXISTENT_ID}`)
          .set('Authorization', `Bearer ${test.token}`);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.match(/task .* not found/i);
      });
    });

    describe('PUT /tasks/:taskId - updateTask', () => {
      it('should return 400 if no valid fields are provided', async () => {
        const res = await request(app)
          .put(`/tasks/${test.tasks[0].id}`)
          .send({})
          .set('Authorization', `Bearer ${test.token}`);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.match(/at least one field must be updated/i);
      });

      it('should return 400 if dueDate is invalid', async () => {
        const res = await request(app)
          .put(`/tasks/${test.tasks[0].id}`)
          .send({ dueDate: 'invalid-date' })
          .set('Authorization', `Bearer ${test.token}`);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.match(/"dueDate" must be a valid date/i);
      });

      it('should return 400 if title is not a string', async () => {
        const res = await request(app)
          .put(`/tasks/${test.tasks[0].id}`)
          .send({ title: 123456 })
          .set('Authorization', `Bearer ${test.token}`);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.match(/"title" must be a string/i);
      });

      it('should return 400 if description is not a string', async () => {
        const res = await request(app)
          .put(`/tasks/${test.tasks[0].id}`)
          .send({ title: 'Task Tile', description: 123456 })
          .set('Authorization', `Bearer ${test.token}`);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.match(/"description" must be a string/i);
      });

      it('should return 404 if task does not exist', async () => {
        const res = await request(app)
          .put(`/tasks/${NON_EXISTENT_ID}`)
          .send({ title: 'Updated Task' })
          .set('Authorization', `Bearer ${test.token}`);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.match(/task .* not found/i);
      });
    });

    describe('PATCH /tasks/:taskId/status - updateTaskStatus', () => {
      it('should return 400 if value param is missing', async () => {
        const res = await request(app)
          .patch(`/tasks/${test.tasks[0].id}/status`)
          .set('Authorization', `Bearer ${test.token}`);

        expect(res.status).to.equal(400);
        expect(res.body.message).to.match(/value param is missing/i);
      });

      it('should return 400 if value param is invalid', async () => {
        const res = await request(app)
          .patch(`/tasks/${test.tasks[0].id}/status?value=invalid_status`)
          .set('Authorization', `Bearer ${test.token}`);

        expect(res.status).to.equal(400);
        expect(res.body.message).to.match(/must be one of/i);
      });

      it('should return 404 if task does not exist', async () => {
        const res = await request(app)
          .patch(`/tasks/${NON_EXISTENT_ID}/status?value=in_progress`)
          .set('Authorization', `Bearer ${test.token}`);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.match(/task .* not found/i);
      });
    });

    describe('PATCH /tasks/:taskId/assign - assignTask', () => {
      it('should return 400 if userId is missing', async () => {
        const res = await request(app)
          .patch(`/tasks/${test.tasks[0].id}/assign`)
          .send({})
          .set('Authorization', `Bearer ${test.token}`);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.include('is required');
      });

      it('should return 400 if userId is not valid', async () => {
        const res = await request(app)
          .patch(`/tasks/${test.tasks[0].id}/assign`)
          .send({ userId: INVALID_ID })
          .set('Authorization', `Bearer ${test.token}`);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.include('must be a number');
      });

      it('should return 404 if task does not exist', async () => {
        const res = await request(app)
          .patch(`/tasks/${NON_EXISTENT_ID}/assign`)
          .send({ userId: test.user.id })
          .set('Authorization', `Bearer ${test.token}`);

        expect(res.status).to.equal(404);
        expect(res.body.message).to.match(/task .* not found/i);
      });

      it('should return 404 if user does not exist', async () => {
        const res = await request(app)
          .patch(`/tasks/${test.tasks[0].id}/assign`)
          .send({ userId: NON_EXISTENT_ID })
          .set('Authorization', `Bearer ${test.token}`);

        expect(res.status).to.equal(404);
        expect(res.body.message).to.match(/user .* not found/i);
      });
      it('should return 400 if user is not a member of the project', async () => {
        const nonMemberUser = await createUser();

        const res = await request(app)
          .patch(`/tasks/${test.tasks[0].id}/assign`)
          .send({ userId: nonMemberUser.id })
          .set('Authorization', `Bearer ${test.token}`);

        expect(res.status).to.equal(403);
        expect(res.body.message).to.match(/is not a member/i);
      });
    });
  });
});
