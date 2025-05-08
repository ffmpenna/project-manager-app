const app = require('../../src/app');
const request = require('supertest');
const chaiHttp = require('chai-http');
const { faker } = require('@faker-js/faker');
const { User, Project, ProjectMember } = require('../../src/models');
const { mockUser, mockProject, mockRegisterUser } = require('../helpers');
const { expect, use } = require('chai');
const { createTestContext, cleanupTestData } = require('../helpers/testContext');

use(chaiHttp);

let test;
const INVALID_ID = 999;

beforeEach(async () => {
  await cleanupTestData();
  test = await createTestContext();
});

describe('User Routes', () => {
  describe('SUCCESS CASES:', () => {
    describe('GET /users', () => {
      it('should fetch all users', async () => {
        const response = await request(app)
          .get('/users')
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(200);
        expect(response.body.data.users).to.be.an('array');
        expect(response.body.data.users.length).to.be.at.least(3);
      });
    });

    describe('GET /users/:id', () => {
      it('should fetch a specific user', async () => {
        const response = await request(app)
          .get(`/users/${test.user.id}`)
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(200);
        expect(response.body.data.user).to.include.keys(['id', 'name', 'email']);
      });
    });

    describe('GET /users/:id/projects', () => {
      it('should only list projects that have a specific member within', async () => {
        const otherTestUser = await User.create(mockUser());

        const userProjects = await Project.bulkCreate(mockProject(test.user.id, 5));
        await Project.bulkCreate(mockProject(otherTestUser.id, 5));

        const memberships = userProjects.map((project) => ({
          userId: test.user.id,
          projectId: project.id,
          role: 'member',
        }));

        await ProjectMember.bulkCreate(memberships);

        const response = await request(app)
          .get(`/users/${test.user.id}/projects`)
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(200);
        expect(response.body.data.projects).to.have.lengthOf(userProjects.length);

        const returnedProjectIds = response.body.data.projects.map((p) => p.id);
        const expectedProjectIds = userProjects.map((p) => p.id);

        expectedProjectIds.forEach((id) => expect(returnedProjectIds).to.include(id));
      });
    });

    describe('PUT /users/:id', () => {
      it('should update a specific user', async () => {
        const updatedData = mockRegisterUser();

        const response = await request(app)
          .put(`/users/${test.user.id}`)
          .send(updatedData)
          .set('Authorization', `Bearer ${test.token}`);

        const { password, ...safeData } = updatedData;
        const updatedUser = await User.findByPk(test.user.id);

        expect(response.status).to.equal(200);
        expect(Number(response.body.data.usersUpdated)).to.equal(1);
        expect(updatedUser).to.include(safeData);
      });
    });

    describe('DELETE /users/:id', () => {
      it('should delete a specific user', async () => {
        const response = await request(app)
          .delete(`/users/${test.user.id}`)
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(200);
        expect(response.body.data.usersRemoved).to.equal(1);
      });
    });
  });

  describe('ERROR CASES:', () => {
    describe('PUT /users/:id - Error Cases', () => {
      it('should reject empty update body', async () => {
        const response = await request(app)
          .put(`/users/${test.user.id}`)
          .send({})
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.include('must have at least 1 key');
      });

      it('should reject invalid email update', async () => {
        const response = await request(app)
          .put(`/users/${test.user.id}`)
          .send({ email: 'invalid-email' })
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.include('must be a valid email');
      });

      it('should reject invalid name update', async () => {
        const response = await request(app)
          .put(`/users/${test.user.id}`)
          .send({ name: 'Invalid@Name' })
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.include('/name/ must contain only letters');
      });

      it('should reject invalid short password update', async () => {
        const response = await request(app)
          .put(`/users/${test.user.id}`)
          .send({ password: 'pass' })
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.include(
          'length must be at least 8 characters long',
        );
      });
      it('should reject invalid only uppercase password update', async () => {
        const response = await request(app)
          .put(`/users/${test.user.id}`)
          .send({ password: 'PASSWORD123#' })
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.include('must contain at least one lowercase');
      });
      it('should reject invalid only lowercase password update', async () => {
        const response = await request(app)
          .put(`/users/${test.user.id}`)
          .send({ password: 'password123#' })
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.include('must contain at least one uppercase');
      });
      it('should reject invalid without special character password update', async () => {
        const response = await request(app)
          .put(`/users/${test.user.id}`)
          .send({ password: 'Password123' })
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.include(
          'must contain at least one special character',
        );
      });
      it('should reject invalid without number password update', async () => {
        const response = await request(app)
          .put(`/users/${test.user.id}`)
          .send({ password: 'Password#' })
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.include(' must contain at least one number');
      });

      it('should return 404 for non-existent user', async () => {
        const response = await request(app)
          .put(`/users/${INVALID_ID}`)
          .send({ name: faker.person.fullName() })
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(404);
      });
    });
    describe('GET /users/:id/projects', () => {
      it('should return 404 if user does not exist', async () => {
        const NON_EXISTANT_ID = 999;

        const response = await request(app)
          .get(`/users/${NON_EXISTANT_ID}/projects`)
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(404);
        expect(response.body.message).to.match(/not found/i);
      });

      it('should return 400 if user ID is not a valid number', async () => {
        const INVALID_ID = 'invalid_id';

        const response = await request(app)
          .get(`/users/${INVALID_ID}/projects`)
          .set('Authorization', `Bearer ${test.token}`);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.match(/must be a number/i);
      });
    });
  });
});
