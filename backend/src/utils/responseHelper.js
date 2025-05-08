const successResponse = (status = 'OK', message = 'Success', data) => ({
  status,
  message,
  data,
});

module.exports = {
  successResponse,
};
