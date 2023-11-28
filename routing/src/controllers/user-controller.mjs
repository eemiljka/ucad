import { validationResult } from "express-validator";

const postUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "invalid input fields" });
  }
  const newUserId = await addUser(req.body);
  res.status(201).json({ message: "User added", user_id: newUserId });
};

const getUsers = (req, res) => {
  res.json({ users: "get" });
};

const getUsersById = (req, res) => {
  res.json({ message: "getUsersById" });
};

const putUser = (req, res) => {
  res.json({ message: "putUser" });
};

const deleteUser = (req, res) => {
  res.json({ message: "deleteUser" });
};

export { getUsers, getUsersById, postUser, putUser, deleteUser };
