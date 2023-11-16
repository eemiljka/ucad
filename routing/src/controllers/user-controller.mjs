import {
  listAllUsers,
  findUserById,
  addUser,
  updateUser,
  deleteUser,
} from "../models/userModel.mjs";

const getUsers = async (req, res) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error in getUsers:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error in getUserById:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const postUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (username && email && password) {
      const result = await addUser({ username, email, password });
      res
        .status(201)
        .json({ message: "New user added.", user_id: result.user_id });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.error("Error in postUser:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const putUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;
    const result = await updateUser(userId, updatedUser);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error in putUser:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const deletedUser = await deleteUser(userId);
    if (deletedUser) {
      res.json(deletedUser);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error in deleteUser:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getUsers, getUserById, postUser, putUser, deleteUser };
