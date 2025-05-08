const { BadRequestError } = require('../utils/CustomErrors');

const validate = (schema, errorMessage) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    next();
  };
};

module.exports = validate;
