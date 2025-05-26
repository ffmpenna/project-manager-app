const { sequelize } = require('../models/');

// This utility function handles database transactions
// preventing data inconsistencies if something go wrong in the middle of the transaction.
const handleTransaction = async (callback) => {
  const transaction = await sequelize.transaction();
  try {
    const result = await callback(transaction);
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = handleTransaction;
