import express from "express";
import {
  getMedia,
  getMediaById,
  postMedia,
  putMedia,
  deleteMedia,
} from "../controllers/media-controller.mjs";
import { logger } from "../middlewares/middlewares.mjs";

const mediaRouter = express.Router();
const upload = multer({ dest: "uploads/" });

// router specific middleware
// mediaRouter.use(logger);

mediaRouter.route("/").get(getMedia).post(upload.single("file"), postMedia);
mediaRouter.route("/:id").get(getMediaById).put(putMedia).delete(deleteMedia);

export default mediaRouter;
