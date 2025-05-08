const { NotFoundError, BadRequestError } = require('./CustomErrors');

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
