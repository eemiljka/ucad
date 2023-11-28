/**
 * Simple custom middleware for logging/debugging requests to console
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

const logger = (req, res, next) => {
  console.log("Time:", new Date().toISOString(), req.method, req.url);
  next();
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
};

export { logger, notFoundHandler, errorHandler };
