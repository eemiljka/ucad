import express from "express";
import { postLogin, getMe } from "../controllers/auth-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";

const authRouter = express.Router();

// routes for /api/users/
authRouter.route("/login").post(postLogin);
authRouter.route("/me").get(authenticateToken, getMe);

// routes for /api/users/:id
export default authRouter;
