import jwt from "jsonwebtoken";
import "dotenv/config";
import { login } from "../models/user-model.mjs";
import bcrypt from "bcryptjs";

/**
 * @api {post} /login Login
 * @apiName Login
 * @apiGroup Authentication
 *
 * @apiParam {String} username User's username.
 * @apiParam {String} password User's password.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {String} token Authentication token.
 * @apiSuccess {Object} user User information.
 */

const postLogin = async (req, res, next) => {
  // TODO: input validation
  const user = await login(req.body.username);
  // user is undefined (username not found in db)
  if (!user) {
    const error = new Error("username/password invalid");
    error.status = 401;
    return next(error);
  }
  // db error in model
  if (user.error) {
    return next(new Error(result.error));
  }

  console.log("postLogin", user);
  const match = await bcrypt.compare(req.body.password, user.password);
  if (match) {
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET);
    res.json({ message: "logged in", token, user });
  } else {
    const error = new Error("username/password invalid");
    error.status = 401;
    return next(error);
  }
};

/**
 * @api {get} /me Get Logged-in User Information
 * @apiName GetMe
 * @apiGroup Authentication
 *
 * @apiSuccess {Object} user User information.
 */

const getMe = (req, res) => {
  console.log("getMe user", req.user);
  res.json(req.user);
};

export { postLogin, getMe };
