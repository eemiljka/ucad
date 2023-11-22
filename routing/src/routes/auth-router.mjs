import express from "express";
import { postLogin } from "../controllers/auth-controller.mjs";

const authRouter = express.Router();

// routes for /api/users/
authRouter.route("/login").post(postLogin);

// routes for /api/users/:id

export default authRouter;
