const app = require('../../src/app');
const request = require('supertest');
const chaiHttp = require('chai-http');
const { mockRegisterUser } = require('../helpers');
const { expect, use } = require('chai');

use(chaiHttp);

describe('Authorization Routes', () => {
  let testUser;
  beforeEach(() => {
    testUser = mockRegisterUser();
  });

  describe('SUCCESS CASES:', () => {
    describe('POST /auth/register', () => {
      it('should create a new user', async () => {
        const response = await request(app).post('/auth/register').send(testUser);

        expect(response.status).to.equal(201);
        expect(response.body.data.user).to.have.property('id');
      });
    });
    describe('ERROR CASES:', () => {
      describe('POST /auth/register - Error Cases', () => {
        it('should reject empty request body', async () => {
          const response = await request(app).post('/auth/register').send({});

          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message');
          expect(response.body.message).to.include('is required');
        });

        it('should reject invalid name (special characters)', async () => {
          const response = await request(app)
            .post('/auth/register')
            .send({ ...testUser, name: 'Joe@Doe' });

          expect(response.status).to.equal(400);
          expect(response.body.message).to.include('/name/ must contain only letters');
        });

        it('should reject short name (<3 characters)', async () => {
          const response = await request(app)
            .post('/auth/register')
            .send({ ...testUser, name: 'Jo' });

          expect(response.status).to.equal(400);
          expect(response.body.message).to.include('at least 3 characters');
        });

        it('should reject invalid email format', async () => {
          const response = await request(app)
            .post('/auth/register')
            .send({
              ...testUser,
              email: 'invalid-email',
            });

          expect(response.status).to.equal(400);
          expect(response.body.message).to.include('must be a valid email');
        });

        it('should reject password without lowercase', async () => {
          const response = await request(app)
            .post('/auth/register')
            .send({ ...testUser, password: 'ALLUPPERCASE123!' });

          expect(response.status).to.equal(400);
          expect(response.body.message).to.include('must contain at least one lowercase');
        });

        it('should reject password without uppercase', async () => {
          const response = await request(app)
            .post('/auth/register')
            .send({ ...testUser, password: 'alllowercase123!' });

          expect(response.status).to.equal(400);
          expect(response.body.message).to.include('must contain at least one uppercase');
        });

        it('should reject password without number', async () => {
          const response = await request(app)
            .post('/auth/register')
            .send({ ...testUser, password: 'NoNumbersHere!' });

          expect(response.status).to.equal(400);
          expect(response.body.message).to.include('must contain at least one number');
        });

        it('should reject password without special character', async () => {
          const response = await request(app)
            .post('/auth/register')
            .send({ ...testUser, password: 'MissingSpecial123' });

          expect(response.status).to.equal(400);
          expect(response.body.message).to.include(
            'must contain at least one special character',
          );
        });

        it('should reject short password (<8 characters)', async () => {
          const response = await request(app)
            .post('/auth/register')
            .send({ ...testUser, password: 'Short1#' });

          expect(response.status).to.equal(400);
          expect(response.body.message).to.include('must be at least 8 characters');
        });
      });
    });
  });
});
