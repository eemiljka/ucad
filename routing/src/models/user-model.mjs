import { promisePool } from "../utils/database.mjs";

/*const fetchAllUsers = async () => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM Users");
    console.log("rows", rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const fetchUserById = async (id) => {
  try {
    const sql = "SELECT * FROM Users WHERE user_id=?";
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    console.log("rows", rows);
    if (rows.length === 0) {
      return false;
    }
    return true;
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};*/

/**
 * Fetch user from database based on user name/password pair
 *
 * @param {object} userCreds - Contains {username, password} properties
 * @returns user object
 */

const login = async (userCreds) => {
  try {
    const sql = `SELECT user_id, username, email, user_level_id FROM Users WHERE username = ? AND password = ?`;
    const params = [userCreds.username, userCreds.password];
    const result = await promisePool.query(sql, params);
    const [rows] = result;
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

/*const updateUser = async (userId, newData, userIdFromToken) => {
  if (userIdFromToken !== userId) {
    throw new Error(
      "Unauthorized: You do not have permission to modify this user's data."
    );
  }
  const updateQuery =
    "UPDATE Users SET username = ?, email = ? WHERE user_id = ?";
  const values = [newData.username, newData.email, userId];
  try {
    await promisePool.query(updateQuery, values); // Corrected
    const updatedUserQuery = "SELECT * FROM Users WHERE user_id = ?";
    const updatedUserData = await promisePool.query(updatedUserQuery, [userId]); // Corrected
    return updatedUserData[0];
  } catch (error) {
    throw error;
  }
};*/

/*const checkMediaOwnershipInDatabase = async (mediaId, userId) => {
  const query =
    "SELECT COUNT(*) AS count FROM Media WHERE media_id = ? AND user_id = ?";
  const result = await promisePool(query, [mediaId, userId]);

  return result[0].count > 0;
};*/

export { login, addUser };
