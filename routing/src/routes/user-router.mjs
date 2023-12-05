import express from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  postUser,
  putUser,
} from "../controllers/user-controller.mjs";
import { body } from "express-validator";

const userRouter = express.Router();

/**
 * @api {route} /users User Endpoints
 * @apiName UserEndpoints
 * @apiGroup Users
 *
 * @apiDescription Endpoints for managing user information.
 */

/**
 * @api {get} /users Get All Users
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiDescription Retrieves all users.
 *
 * @apiSuccess {Object} users Object containing details of all users.
 * @apiSuccess {String} users.users Information about the users.
 *
 * @apiError (Error 5xx) {Object} error Error details.
 * @apiError (Error 5xx) {String} error.message Error message.
 */

// routes for /api/users/
userRouter.route("/").get(getUsers);

/**
 * @api {post} /users Create a New User
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiDescription Creates a new user.
 *
 * @apiParam {String} email User's email.
 * @apiParam {String} username User's username.
 * @apiParam {String} password User's password.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Object containing details of the created user.
 * @apiSuccess {Number} result.user_id ID of the created user.
 *
 * @apiError (Error 4xx) {Number} status HTTP status code.
 * @apiError (Error 4xx) {Object} error Error details.
 * @apiError (Error 4xx) {String} error.message Error message.
 */

userRouter.post(
  body("email").trim().isEmail(),
  body("username").trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
  body("password").trim().isLength({ min: 8 }),
  postUser
);

/**
 * @api {get} /users/:id Get User by ID
 * @apiName GetUserById
 * @apiGroup Users
 *
 * @apiDescription Retrieves a specific user by their ID.
 *
 * @apiParam {Number} id User ID.
 *
 * @apiSuccess {Object} user Object containing details of the requested user.
 * @apiSuccess {Number} user.user_id User ID.
 * @apiSuccess {String} user.username User's username.
 * @apiSuccess {String} user.email User's email.
 * @apiSuccess {Number} user.user_level_id User's level ID.
 *
 * @apiError (Error 5xx) {Object} error Error details.
 * @apiError (Error 5xx) {String} error.message Error message.
 */

// routes for /api/users/:id
userRouter.route("/:id").get(getUserById);

/**
 * @api {put} /users/:id Update User by ID
 * @apiName UpdateUser
 * @apiGroup Users
 *
 * @apiDescription Updates a specific user by their ID.
 *
 * @apiParam {Number} id User ID.
 * @apiParam {String} [email] New email for the user.
 * @apiParam {String} [username] New username for the user.
 * @apiParam {String} [password] New password for the user.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiError (Error 4xx) {Number} status HTTP status code.
 * @apiError (Error 4xx) {Object} error Error details.
 * @apiError (Error 4xx) {String} error.message Error message.
 */

userRouter.put(putUser);

/**
 * @api {delete} /users/:id Delete User by ID
 * @apiName DeleteUser
 * @apiGroup Users
 *
 * @apiDescription Deletes a specific user by their ID.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiError (Error 4xx) {Number} status HTTP status code.
 * @apiError (Error 4xx) {Object} error Error details.
 * @apiError (Error 4xx) {String} error.message Error message.
 */

userRouter.delete(deleteUser);

export default userRouter;
