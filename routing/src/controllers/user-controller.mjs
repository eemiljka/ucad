import { validationResult } from "express-validator";
import { addUser } from "../models/user-model.mjs";
import bcrypt from "bcryptjs";

/**
 * @api {post} /users Create a new user
 * @apiName PostUser
 * @apiGroup Users
 *
 * @apiParam {String} username User's username.
 * @apiParam {String} password User's password.
 * @apiParam {String} [otherField] Other optional field.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {String} user_id ID of the newly created user.
 * @apiError (400) {Object} error Bad Request error.
 * @apiError (500) {Object} error Internal Server Error.
 */

const postUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // details about errors:
    console.log(errors.array());
    return res.status(400).json({ message: "invalid input fields" });
  }
  const newUser = req.body;
  const salt = await bcrypt.genSalt(10);
  // replace plain text password with hash
  newUser.password = await bcrypt.hash(newUser.password, salt);
  // console.log('postUser', newUser);
  const newUserId = await addUser(newUser);
  res.status(201).json({ message: "user added", user_id: newUserId });
};

/**
 * @api {get} /users Get all users
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiSuccess {Object} users Object containing information about all users.
 */

const getUsers = (req, res) => {
  res.json({ users: "get" });
};

const getUserById = (req, res) => {
  res.json({ message: "getUserById" });
};

const putUser = (req, res) => {
  res.json({ message: "putUser" });
};

const deleteUser = (req, res) => {
  res.json({ message: "deleteUser" });
};

export { getUsers, getUserById, postUser, putUser, deleteUser };
