import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { addUser } from "../models/user-model.js";

const postUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "invalid input fields" });
  }
  const newUser = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newUser.password, salt);
  newUser.password = hashedPassword;
  console.log("postUser", newUser);
  const newUserId = await addUser(newUser);
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
