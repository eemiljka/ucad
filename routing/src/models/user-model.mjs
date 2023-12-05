import { promisePool } from "../utils/database.mjs";

/**
 * Fetch user from database based on user name/password pair
 *
 * @param {object} userCreds - Contains {username, password} properties
 * @returns user object
 */

/**
 * @api {function} login User Login
 * @apiName UserLogin
 * @apiGroup Authentication
 *
 * @apiDescription Fetch user from the database based on the username.
 *
 * @apiParam {String} username User's username.
 *
 * @apiSuccess {Object} user User object.
 * @apiSuccess {Number} user.user_id User ID.
 * @apiSuccess {String} user.username User's username.
 * @apiSuccess {String} user.password User's hashed password.
 * @apiSuccess {String} user.email User's email.
 * @apiSuccess {Number} user.user_level_id User's level ID.
 *
 * @apiError (Error 5xx) {Object} error Error details.
 * @apiError (Error 5xx) {String} error.message Error message.
 */

const login = async (username) => {
  try {
    const sql = `SELECT user_id, username, password, email, user_level_id
                 FROM Users WHERE username = ?`;
    const params = [username];
    const result = await promisePool.query(sql, params);
    const [rows] = result; // first item in result array is the data rows
    // console.log('login, user found?', rows[0]);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

/**
 * Creates a new user in the database
 *
 * @param {object} user data
 * @returns {number} - id of the inserted user in db
 */

/**
 * @api {function} addUser Add New User
 * @apiName AddUser
 * @apiGroup Users
 *
 * @apiDescription Creates a new user in the database.
 *
 * @apiParam {Object} user User data.
 * @apiParam {String} user.username User's username.
 * @apiParam {String} user.email User's email.
 * @apiParam {String} user.password User's password.
 *
 * @apiSuccess {Number} userId ID of the inserted user in the database.
 *
 * @apiError (Error 5xx) {Object} error Error details.
 * @apiError (Error 5xx) {String} error.message Error message.
 */

const addUser = async (user) => {
  try {
    const sql = `INSERT INTO Users (username, email, password, user_level_id)
                VALUES (?, ?, ?, ?)`;
    // user level id defaults to 2 (normal user)
    const params = [user.username, user.email, user.password, 2];
    const result = await promisePool.query(sql, params);
    return result[0].insertId;
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

export { login, addUser };
