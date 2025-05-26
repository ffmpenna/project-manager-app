const { NotFoundError, BadRequestError } = require('./CustomErrors');

// This utility function verifies if an entity exists in the database and returns it.
const verifyEntityExists = async ({ id, model, entityName, transaction }) => {
  if (isNaN(id)) {
    throw new BadRequestError(`${entityName} Id must be a number.`);
  }

  const entity = await model.findByPk(id, { transaction });

  if (!entity) {
    throw new NotFoundError(`${entityName} with ID ${id} not found.`);
  }

  return { [entityName.toLowerCase()]: entity };
};

module.exports = verifyEntityExists;
