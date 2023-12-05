/**
 * Simple custom middleware for logging/debugging requests to console
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

/**
 * @api {middleware} logger Logger Middleware
 * @apiName LoggerMiddleware
 * @apiGroup Middleware
 *
 * @apiDescription Simple custom middleware for logging/debugging requests to the console.
 *
 * @apiParam {Object} req Express request object.
 * @apiParam {Object} res Express response object.
 * @apiParam {Function} next Express next function.
 *
 * @apiSuccessExample {console} Console Output:
 *   Time: 2023-12-05T12:34:56.789Z GET /example
 */

const logger = (req, res, next) => {
  console.log("Time:", new Date().toISOString(), req.method, req.url);
  next();
};
/**
 * "Default" route
 */

/**
 * @api {middleware} notFoundHandler Not Found Handler Middleware
 * @apiName NotFoundHandlerMiddleware
 * @apiGroup Middleware
 *
 * @apiDescription Default route handler for handling 404 errors.
 *
 * @apiParam {Object} req Express request object.
 * @apiParam {Object} res Express response object.
 * @apiParam {Function} next Express next function.
 *
 * @apiError (Error 404) {Number} status HTTP status code (404).
 * @apiError (Error 404) {String} message Error message.
 *
 * @apiErrorExample {json} Error 404:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": {
 *       "message": "Not Found - /example",
 *       "status": 404
 *     }
 *   }
 */

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error); // forward error to error handler
};
/**
 * Custom default middleware for handling errors
 */

/**
 * @api {middleware} errorHandler Error Handler Middleware
 * @apiName ErrorHandlerMiddleware
 * @apiGroup Middleware
 *
 * @apiDescription Custom default middleware for handling errors.
 *
 * @apiParam {Object} err Express error object.
 * @apiParam {Object} req Express request object.
 * @apiParam {Object} res Express response object.
 * @apiParam {Function} next Express next function.
 *
 * @apiError (Error 5xx) {Number} status HTTP status code (default is 500 if err.status is not defined).
 * @apiError (Error 5xx) {Object} error Error details.
 * @apiError (Error 5xx) {String} error.message Error message.
 * @apiError (Error 5xx) {Number} error.status HTTP status code.
 *
 * @apiErrorExample {json} Error 500:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "error": {
 *       "message": "Internal Server Error",
 *       "status": 500
 *     }
 *   }
 */

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500); // default is 500 if err.status is not defined
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
};

export { logger, notFoundHandler, errorHandler };
