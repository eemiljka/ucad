import express from "express";
import {
  deleteMedia,
  getMedia,
  getMediaById,
  postMedia,
  putMedia,
} from "../controllers/media-controller.mjs";
import { logger } from "../middlewares/middlewares.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";
import { body } from "express-validator";
import upload from "../middlewares/upload.mjs";

const mediaRouter = express.Router();

/**
 * @api {middleware} logger Logger Middleware
 * @apiName LoggerMiddleware
 * @apiGroup Middleware
 *
 * @apiDescription Simple custom middleware for logging/debugging requests to the console.
 *
 * @apiParam {Object} req Express request object.
 * @apiParam {Object} res Express response object.
 * @apiParam {Function} next Express next function.
 *
 * @apiSuccessExample {console} Console Output:
 *   Time: 2023-12-05T12:34:56.789Z GET /example
 */

// router specific middleware
//mediaRouter.use(logger);

/**
 * @api {route} /media Media Endpoints
 * @apiName MediaEndpoints
 * @apiGroup Media
 *
 * @apiDescription Endpoints for managing media items.
 */

/**
 * @api {get} /media Get All Media
 * @apiName GetMedia
 * @apiGroup Media
 *
 * @apiDescription Retrieves all media items.
 *
 * @apiSuccess {Array} mediaItems Array of media items.
 * @apiSuccess {Number} mediaItems.media_id Media item ID.
 * @apiSuccess {String} mediaItems.filename Filename of the media item.
 * @apiSuccess {Number} mediaItems.filesize File size of the media item.
 * @apiSuccess {String} mediaItems.media_type Media type of the media item.
 * @apiSuccess {String} mediaItems.title Title of the media item.
 * @apiSuccess {String} mediaItems.description Description of the media item.
 * @apiSuccess {String} mediaItems.created_at Timestamp of when the media item was created.
 * @apiSuccess {Number} mediaItems.user_id User ID associated with the media item.
 * @apiSuccess {String} mediaItems.username Username of the user associated with the media item.
 *
 * @apiError (Error 5xx) {Object} error Error details.
 * @apiError (Error 5xx) {String} error.message Error message.
 */

// TODO: check and add authentication where needed
mediaRouter.route("/").get(getMedia);

/**
 * @api {post} /media Create a New Media Item
 * @apiName CreateMedia
 * @apiGroup Media
 *
 * @apiDescription Creates a new media item.
 *
 * @apiUse AuthHeader
 *
 * @apiParam {File} file Media file to be uploaded.
 * @apiParam {String} title Title of the media item.
 * @apiParam {String} description Description of the media item.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Object containing details of the created media item.
 * @apiSuccess {Number} result.media_id ID of the created media item.
 *
 * @apiError (Error 4xx) {Number} status HTTP status code.
 * @apiError (Error 4xx) {Object} error Error details.
 * @apiError (Error 4xx) {String} error.message Error message.
 */

mediaRouter.post(
  authenticateToken,
  upload.single("file"),
  // TODO: add missing validation rules
  body("title").trim().isLength({ min: 3 }),
  body("description"),
  postMedia
);

/**
 * @api {get} /media/:id Get Media Item by ID
 * @apiName GetMediaById
 * @apiGroup Media
 *
 * @apiDescription Retrieves a specific media item by its ID.
 *
 * @apiParam {Number} id Media item ID.
 *
 * @apiSuccess {Object} mediaItem Object containing details of the requested media item.
 * @apiSuccess {Number} mediaItem.media_id Media item ID.
 * @apiSuccess {String} mediaItem.filename Filename of the media item.
 * @apiSuccess {Number} mediaItem.filesize File size of the media item.
 * @apiSuccess {String} mediaItem.media_type Media type of the media item.
 * @apiSuccess {String} mediaItem.title Title of the media item.
 * @apiSuccess {String} mediaItem.description Description of the media item.
 * @apiSuccess {String} mediaItem.created_at Timestamp of when the media item was created.
 * @apiSuccess {Number} mediaItem.user_id User ID associated with the media item.
 * @apiSuccess {String} mediaItem.username Username of the user associated with the media item.
 *
 * @apiError (Error 5xx) {Object} error Error details.
 * @apiError (Error 5xx) {String} error.message Error message.
 */

mediaRouter.route("/:id").get(getMediaById);

/**
 * @api {put} /media/:id Update Media Item by ID
 * @apiName UpdateMedia
 * @apiGroup Media
 *
 * @apiDescription Updates a specific media item by its ID.
 *
 * @apiUse AuthHeader
 *
 * @apiParam {Number} id Media item ID.
 * @apiParam {String} [title] New title for the media item.
 * @apiParam {String} [description] New description for the media item.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiError (Error 4xx) {Number} status HTTP status code.
 * @apiError (Error 4xx) {Object} error Error details.
 * @apiError (Error 4xx) {String} error.message Error message.
 */

mediaRouter.put(putMedia);

/**
 * @api {delete} /media/:id Delete Media Item by ID
 * @apiName DeleteMedia
 * @apiGroup Media
 *
 * @apiDescription Deletes a specific media item by its ID.
 *
 * @apiUse AuthHeader
 *
 * @apiParam {Number} id Media item ID.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiError (Error 4xx) {Number} status HTTP status code.
 * @apiError (Error 4xx) {Object} error Error details.
 * @apiError (Error 4xx) {String} error.message Error message.
 */

mediaRouter.delete(deleteMedia);

export default mediaRouter;
