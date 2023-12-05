import jwt from "jsonwebtoken";
import "dotenv/config";

/**
 * @apiDefine AuthHeader
 * @apiHeader {String} Authorization User's authentication token.
 */

/**
 * @api {middleware} authenticateToken Authenticate Token
 * @apiName AuthenticateToken
 * @apiGroup Authentication
 *
 * @apiDescription Middleware to authenticate user requests using JWT token.
 *
 * @apiUse AuthHeader
 *
 * @apiSuccess (Success 2xx) {Object} user Authenticated user object.
 * @apiSuccess (Success 2xx) {String} user.user_id User's ID.
 * @apiSuccess (Success 2xx) {String} user.username User's username.
 *
 * @apiError (Error 4xx) {Number} status HTTP status code.
 * @apiError (Error 4xx) {String} message Error message.
 *
 * @apiErrorExample {json} Error 401:
 *   HTTP/1.1 401 Unauthorized
 *   {
 *     "message": "Unauthorized"
 *   }
 *
 * @apiErrorExample {json} Error 403:
 *   HTTP/1.1 403 Forbidden
 *   {
 *     "message": "Invalid token"
 *   }
 */

const authenticateToken = (req, res, next) => {
  console.log("authenticateToken", req.headers);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token", token);
  if (token == null) {
    return res.sendStatus(401);
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).send({ message: "invalid token" });
  }
};

export { authenticateToken };
