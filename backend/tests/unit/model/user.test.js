const { expect } = require('chai');
const sinon = require('sinon');
const { User } = require('../../../src/models');

describe('User Model - Unit Tests', function () {
  afterEach(() => {
    sinon.restore();
  });

  it('should successfully create a new user', async () => {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      passwordHash: 'hash123',
    };
    sinon.stub(User, 'create').resolves(mockUser);

    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      passwordHash: 'hash123',
    });

    expect(user).to.deep.equal(mockUser);
  });

  it('should fetch a user by e-mail', async () => {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      passwordHash: 'hash123',
    };
    sinon.stub(User, 'findOne').resolves(mockUser);

    const user = await User.findOne({ where: { email: 'john@example.co' } });

    expect(user).to.deep.equal(mockUser);
  });

  it('should successfully update a user', async () => {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      passwordHash: 'hash123',
      update: sinon.stub().resolves({
        id: 1,
        name: 'John Updated',
        email: 'john@example.com',
        passwordHash: 'hash123',
      }),
    };
    sinon.stub(User, 'findByPk').resolves(mockUser);

    const updatedUser = await mockUser.update({ name: 'John Updated' });

    expect(updatedUser.name).to.equal('John Updated');
    expect(mockUser.update.calledOnce).to.be.true;
  });

  it('should successfully delete a user', async () => {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      passwordHash: 'hash123',
      destroy: sinon.stub().resolves(true),
    };
    sinon.stub(User, 'findByPk').resolves(mockUser);

    const result = await mockUser.destroy();

    expect(result).to.be.true;
    expect(mockUser.destroy.calledOnce).to.be.true;
  });

  it('should fetch all users', async () => {
    const mockUsers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        passwordHash: 'hash123',
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@example.com',
        passwordHash: 'hash456',
      },
    ];
    sinon.stub(User, 'findAll').resolves(mockUsers);

    const users = await User.findAll();

    expect(users).to.deep.equal(mockUsers);
    expect(users.length).to.equal(2);
  });
  it('should fetch a user by Id', async () => {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      passwordHash: 'hash123',
    };
    sinon.stub(User, 'findByPk').resolves(mockUser);

    const user = await User.findByPk(1);

    expect(user).to.deep.equal(mockUser);
  });
});
