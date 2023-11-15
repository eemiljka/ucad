import express from "express";
import {
  getMedia,
  getMediaById,
  PostMedia,
  PutMedia,
  deleteMedia,
} from "../controllers/media-controller.mjs";

const mediaRouter = express.Router();

mediaRouter.route("/").get(getMedia).post(PostMedia);

mediaRouter.route("/:id").get(getMediaById).put(PutMedia).delete(deleteMedia);

export default mediaRouter;
