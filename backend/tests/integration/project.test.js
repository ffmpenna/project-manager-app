const app = require('../../src/app');
const request = require('supertest');
const chaiHttp = require('chai-http');
const { expect, use } = require('chai');
const { Project, User, Task, Comment, ProjectMember } = require('../../src/models');
const {
  mockProject,
  mockUser,
  mockProjectMember,
  createUser,
  createUsers,
} = require('../helpers/');
const { createTestContext, cleanupTestData } = require('../helpers/testContext');
const { expectProjectShape } = require('../helpers/expectShape');

use(chaiHttp);

describe('Project Routes', () => {
  const DEFAULT_LENGTH = 10;
  const NON_EXISTENT_ID = 99999;

  let test;

  beforeEach(async () => {
    await cleanupTestData();
    test = await createTestContext();
  });

  describe('SUCCESS CASES', () => {
    describe('GET /projects', () => {
      it('fetches all projects', async () => {
        const response = await request(app)
          .get('/projects')
          .set('Authorization', `Bearer ${test.token}`);
        expect(response.status).to.equal(200);
        expect(response.body.data.projects).to.have.lengthOf(DEFAULT_LENGTH);
        expectProjectShape(response.body.data.projects[0], test.projects[0]);
      });

      it('filters projects by creator', async () => {
        const otherUser = await createUser();
        const projects = await Project.bulkCreate(mockProject(otherUser.id, 5));
        const response = await request(app)
          .get(`/projects/?createdBy=${otherUser.id}`)
          .set('Authorization', `Bearer ${test.token}`);
        expect(response.status).to.equal(200);
        expect(response.body.data.projects).to.have.lengthOf(projects.length);
        response.body.data.projects.forEach((p) =>
          expect(p.createdBy).to.equal(otherUser.id),
        );
      });
    });

    describe('GET /projects/:id', () => {
      it('retrieves a specific project', async () => {
        const response = await request(app)
          .get(`/projects/${test.projects[0].id}`)
          .set('Authorization', `Bearer ${test.token}`);
        expect(response.status).to.equal(200);
        expectProjectShape(response.body.data.project, test.projects[0]);
      });
    });

    describe('POST /projects', () => {
      it('creates a project', async () => {
        const { createdBy, ...projectData } = mockProject(test.loggedUser.id);
        const response = await request(app)
          .post('/projects')
          .send(projectData)
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(201);
        expect(response.body.data.project).to.have.property('id');
        expect(response.body.data.project.createdBy).to.be.equal(test.loggedUser.id);
      });
    });

    describe('PUT /projects/:id', () => {
      it('updates a project', async () => {
        const update = { title: 'Updated Title', description: 'Updated desc' };
        const updateResponse = await request(app)
          .put(`/projects/${test.projects[0].id}`)
          .send(update)
          .set('Authorization', `Bearer ${test.token}`);
        expect(updateResponse.status).to.equal(200);

        const checkUpdate = await Project.findByPk(test.projects[0].id);
        expect(updateResponse.body.data.updatedProject).to.include(checkUpdate.get());
      });
    });

    describe('DELETE /projects/:id', () => {
      it('deletes a project', async () => {
        const removeResponse = await request(app)
          .delete(`/projects/${test.projects[0].id}`)
          .set('Authorization', `Bearer ${test.token}`);
        expect(removeResponse.status).to.equal(200);

        const checkRemoval = await Project.findByPk(test.projects[0].id);
        expect(checkRemoval).to.be.null;
      });
    });

    describe('Project Members', () => {
      describe('POST /projects/:id/members', () => {
        it('adds members', async () => {
          const users = await createUsers(3);
          const members = mockProjectMember(users.map((u) => u.id));
          const response = await request(app)
            .post(`/projects/${test.projects[0].id}/members`)
            .send(members)
            .set('Authorization', `Bearer ${test.token}`);

          expect(response.status).to.equal(201);
          expect(response.body.data.addedMembers).to.have.lengthOf(3);
        });
      });

      describe('GET /projects/:id/members', () => {
        it('lists members', async () => {
          const users = await createUsers(2);
          const memberData = mockProjectMember(users.map((u) => u.id)).map((m) => ({
            ...m,
            projectId: test.projects[1].id,
          }));
          await ProjectMember.bulkCreate(memberData);

          const response = await request(app)
            .get(`/projects/${test.projects[1].id}/members`)
            .set('Authorization', `Bearer ${test.token}`);
          expect(response.status).to.equal(200);
          expect(response.body.data.members).to.have.lengthOf(2);
        });
      });

      describe('PUT /projects/:id/members/:userId', () => {
        it('updates member role', async () => {
          await ProjectMember.create({
            userId: test.user.id,
            projectId: test.projects[0].id,
            role: 'member',
          });
          const response = await request(app)
            .put(`/projects/${test.projects[0].id}/members/${test.user.id}`)
            .send({ role: 'admin' })
            .set('Authorization', `Bearer ${test.token}`);

          expect(response.status).to.equal(200);
          expect(response.body.message).to.match(/Role updated/i);

          const checkUpdate = await ProjectMember.findOne({
            where: { userId: test.user.id, projectId: test.projects[0].id },
          });
          expect(checkUpdate.role).to.equal('admin');
        });
      });

      describe('DELETE /projects/:id/members/:userId', () => {
        it('removes member', async () => {
          await ProjectMember.create({
            userId: test.user.id,
            projectId: test.projects[0].id,
            role: 'member',
          });
          const response = await request(app)
            .delete(`/projects/${test.projects[0].id}/members/${test.user.id}`)
            .set('Authorization', `Bearer ${test.token}`);
          expect(response.status).to.equal(200);
          expect(response.body.message).to.match(/removed/i);

          const checkRemoval = await ProjectMember.findOne({
            where: { userId: test.user.id, projectId: test.projects[0].id },
          });
          expect(checkRemoval).to.be.null;
        });
      });
    });
  });

  describe('ERROR CASES', () => {
    describe('GET /projects/:id', () => {
      it('should return 404 if project does not exist', async () => {
        const response = await request(app)
          .get(`/projects/${NON_EXISTENT_ID}`)
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(404);
        expect(response.body.message).to.include(
          `Project with ID ${NON_EXISTENT_ID} not found`,
        );
      });

      it('should return 400 for invalid project ID', async () => {
        const response = await request(app)
          .get('/projects/invalid_id')
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.include('Project Id must be a number');
      });
    });

    describe('POST /projects', () => {
      it('should return 400 if required fields are missing', async () => {
        const response = await request(app)
          .post('/projects')
          .send({})
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.include('"title" is required');
      });

      it('should return 400 if title is too short', async () => {
        const response = await request(app)
          .post('/projects')
          .send({ title: 'A', createdBy: 1 })
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.include(
          '"title" length must be at least 3 characters long',
        );
      });
    });

    describe('PUT /projects/:id', () => {
      it('should return 400 if no update data is provided', async () => {
        const response = await request(app)
          .put(`/projects/${test.projects[0].id}`)
          .send({})
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.include('At least one field must be updated');
      });

      it('should return 400 if title is too long', async () => {
        const response = await request(app)
          .put(`/projects/${test.projects[0].id}`)
          .send({ title: 'A'.repeat(101) })
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.include(
          '"title" length must be less than or equal to 100 characters long',
        );
      });

      it('should return 404 if trying to update a non-existent project', async () => {
        const response = await request(app)
          .put(`/projects/${NON_EXISTENT_ID}`)
          .send({ title: 'New Title' })
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(404);
        expect(response.body.message).to.include(
          `Project with ID ${NON_EXISTENT_ID} not found`,
        );
      });
    });

    describe('DELETE /projects/:id', () => {
      it('should return 404 if trying to delete a non-existent project', async () => {
        const response = await request(app)
          .delete(`/projects/${NON_EXISTENT_ID}`)
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(404);
        expect(response.body.message).to.include(
          `Project with ID ${NON_EXISTENT_ID} not found`,
        );
      });
    });

    describe('POST /projects/:id/members', () => {
      beforeEach(async () => {
        existingUser = test.user;
        newUser = await createUser();
      });

      it('should return 404 if project does not exist', async () => {
        const response = await request(app)
          .post(`/projects/${NON_EXISTENT_ID}/members`)
          .send([{ userId: newUser.id, role: 'member' }])
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(404);
        expect(response.body.message).to.include(
          `Project with ID ${NON_EXISTENT_ID} not found`,
        );
      });

      it('should return 404 if one or more users do not exist', async () => {
        const response = await request(app)
          .post(`/projects/${test.projects[0].id}/members`)
          .send([{ userId: NON_EXISTENT_ID, role: 'member' }])
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(404);
        expect(response.body.message).to.include('Users not found');
        expect(response.body.details.missingIds).to.include(NON_EXISTENT_ID);
      });

      it('should return 409 if a user is already in the project', async () => {
        await ProjectMember.create({
          projectId: test.projects[0].id,
          userId: existingUser.id,
          role: 'member',
        });

        const response = await request(app)
          .post(`/projects/${test.projects[0].id}/members`)
          .send([{ userId: existingUser.id, role: 'member' }])
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(409);
        expect(response.body.message).to.include('Users already in project');
        expect(response.body.details.conflictingIds).to.include(existingUser.id);
      });

      it('should return 409 if the "role" field is neither "member" nor "admin"', async () => {
        const response = await request(app)
          .post(`/projects/${test.projects[0].id}/members`)
          .send([{ userId: newUser.id, role: 'invalid role' }])
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.includes('must be one of');
      });
    });
    describe('PUT /projects/:id/members/:userId', () => {
      beforeEach(async () => {
        await ProjectMember.create({
          userId: test.user.id,
          projectId: test.projects[0].id,
          role: 'member',
        });
      });

      it('should return 404 if project does not exist', async () => {
        const response = await request(app)
          .put(`/projects/${NON_EXISTENT_ID}/members/${test.user.id}`)
          .send({ role: 'admin' })
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(404);
        expect(response.body.message).to.match(/not found/i);
      });

      it('should return 404 if member not in project', async () => {
        const newUser = await User.create(mockUser());
        const response = await request(app)
          .put(`/projects/${test.projects[0].id}/members/${newUser.id}`)
          .send({ role: 'admin' })
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(403);
        expect(response.body.message).to.match(/is not a member/i);
      });

      it('should return 400 if role is neither "admin" nor "member"', async () => {
        const INVALID_ROLE = 'invalid_role';
        const response = await request(app)
          .put(`/projects/${test.projects[0].id}/members/${test.user.id}`)
          .send({ role: INVALID_ROLE })
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.match(/must be one of/i);
      });
    });
    describe('DELETE /projects/:id/members/:userId', () => {
      beforeEach(async () => {
        await ProjectMember.create({
          userId: test.user.id,
          projectId: test.projects[0].id,
          role: 'member',
        });
      });

      it('should remove member successfully', async () => {
        const response = await request(app)
          .delete(`/projects/${test.projects[0].id}/members/${test.user.id}`)
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(200);
        expect(response.body.message).to.match(/removed/);
        expect(response.body.data.count).to.equal(1);
      });

      it('should return 404 if project does not exist', async () => {
        const response = await request(app)
          .delete(`/projects/${NON_EXISTENT_ID}/members/${test.user.id}`)
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(404);
        expect(response.body.message).to.match(/not found/i);
      });

      it('should return 404 if user does not exist', async () => {
        const response = await request(app)
          .delete(`/projects/${test.projects[0].id}/members/${NON_EXISTENT_ID}`)
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(404);
        expect(response.body.message).to.match(/not found/i);
      });

      it('should return 400 if user is not a member', async () => {
        const newUser = await User.create(mockUser());
        const response = await request(app)
          .delete(`/projects/${test.projects[0].id}/members/${newUser.id}`)
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(403);
        expect(response.body.message).to.match(/not a member/i);
      });
    });

    describe('Authorization Errors', () => {
      it('should return 401 if test.token is missing', async () => {
        const response = await request(app).get('/projects');
        expect(response.status).to.equal(401);
        expect(response.body.message).to.include('Token not provided');
      });

      it('should return 403 if test.token is invalid', async () => {
        const response = await request(app)
          .get('/projects')
          .set('Authorization', 'Bearer token');
        expect(response.status).to.equal(403);
        expect(response.body.message).to.include('Invalid or expired token');
      });
    });
  });
});
