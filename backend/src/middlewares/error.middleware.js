const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details || null;

  if (process.env.NODE_ENV !== 'test') {
    console.error(`[Error] ${err.name || 'Error'}: ${message}`);
  }
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack || details);
  }

  res.status(statusCode).json({
    error: true,
    message,
    ...(details && { details }),
  });
};

module.exports = errorMiddleware;
