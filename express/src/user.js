import users from "./mock-data/users.json" assert { type: "json" };

const getUsers = (req, res) => {
  res.json(users);
};

const getUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.user_id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

let lastUserId = 3609;

const generateNewUserId = () => {
  lastUserId++;
  return lastUserId;
};

const createUser = (req, res) => {
  const newUser = req.body;

  newUser.user_id = generateNewUserId();

  users.push(newUser);

  res.status(201).json(newUser);
};

const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);

  const index = users.findIndex((user) => user.user_id === userId);

  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];
    res.json(deletedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const modifyUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;

  const index = users.findIndex((user) => user.user_id === userId);

  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    res.json(users[index]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export { getUsers, getUserById, createUser, deleteUser, modifyUser };
