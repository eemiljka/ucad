import db from "../utils/dbConfig.js";
import users from "../mock-data/users.json" assert { type: "json" };

const listAllUsers = async () => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM users");
    console.log("rows", rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const findUserById = async (id) => {
  try {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM users WHERE user_id = ?", [id]);

    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (e) {
    console.error("Error in findUserById:", e.message);
    throw e;
  }
};

const addUser = async (user) => {
  const { username, email, password } = user;

  try {
    const [result] = await db
      .promise()
      .query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [
        username,
        email,
        password,
      ]);

    const newUserId = result.insertId;
    return { user_id: newUserId };
  } catch (e) {
    console.error("Error in addUser:", e.message);
    throw e;
  }
};

export { listAllUsers, findUserById, addUser };
