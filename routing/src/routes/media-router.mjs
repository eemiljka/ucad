import express from "express";
import {
  getMedia,
  getMediaById,
  postMedia,
  putMedia,
  deleteMedia,
} from "../controllers/mediaController.mjs";
import { upload } from "../multerConfig.mjs";

const mediaRouter = express.Router();

mediaRouter.route("/").get(getMedia).post(upload.single("avatar"), postMedia);

mediaRouter.route("/:id").get(getMediaById).put(putMedia).delete(deleteMedia);

export default mediaRouter;
