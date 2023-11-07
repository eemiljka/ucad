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

export { getUsers, getUserById, createUser };
