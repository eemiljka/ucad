import express from "express";
import {
  getUsers,
  getUsersById,
  postUser,
  putUser,
  deleteUser,
} from "../controllers/user-controller.mjs";
import { body } from "express-validator";
import { checkUserOwnership } from "../middlewares/authorization.mjs";

const userRouter = express.Router();

// routes for /api/users/
userRouter
  .route("/")
  .get(getUsers)
  .post(
    body("username").trim().isLength({ min: 3, max: 20 }),
    body("password").trim().isLength({ min: 8 }),
    body("email"),
    postUser
  );

// routes for /api/users/:id
userRouter.route("/:id").get(getUsersById).put(putUser).delete(deleteUser);
userRouter.route("/api/users/:id").put(checkUserOwnership, putUser);

export default userRouter;
