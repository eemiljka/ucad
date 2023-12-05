import { validationResult } from "express-validator";
import {
  addMedia,
  fetchAllMedia,
  fetchMediaById,
} from "../models/media-model.mjs";

/**
 * @api {get} /media Get All Media Items
 * @apiName GetMedia
 * @apiGroup Media
 *
 * @apiSuccess {Array} mediaItems Array of media items.
 */

const getMedia = async (req, res) => {
  const mediaItems = await fetchAllMedia();
  res.json(mediaItems);
};

/**
 * @api {get} /media/:id Get Media Item by ID
 * @apiName GetMediaById
 * @apiGroup Media
 *
 * @apiParam {String} id Media item ID.
 *
 * @apiSuccess {Object} mediaItem Media item details.
 * @apiError (404) {Object} error Not Found error.
 * @apiError (500) {Object} error Internal Server Error.
 */

const getMediaById = async (req, res) => {
  console.log(req.params);
  const result = await fetchMediaById(req.params.id);
  // "error handling" for different scenarios
  if (result) {
    if (result.error) {
      res.status(500);
    }
    res.json(result);
  } else {
    res.status(404);
    res.json({ error: "Not Found", media_id: req.params.id });
  }
};

/**
 * @api {post} /media Add New Media Item
 * @apiName PostMedia
 * @apiGroup Media
 *
 * @apiParam {String} title Title of the media item.
 * @apiParam {String} description Description of the media item.
 * @apiParam {File} file Media file to upload.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Details about the added media item.
 * @apiError (400) {Object} error Bad Request error.
 * @apiError (500) {Object} error Internal Server Error.
 */

const postMedia = async (req, res, next) => {
  //console.log('uploaded file', req.file);
  //console.log('uploaded form data', req.body);
  // Error handling moved to fileFilter
  // if (!req.file) {
  //   const error = new Error('file missing or invalid');
  //   error.status = 400;
  //   return next(error);
  // }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // details about errors:
    console.log("validation errors", errors.array());
    const error = new Error("invalid input fields");
    error.status = 400;
    return next(error);
  }
  const { title, description } = req.body;
  const { filename, mimetype, size } = req.file;
  // req.user is added by authenticateToken middleware
  const user_id = req.user.user_id;
  const newMedia = { title, description, user_id, filename, mimetype, size };
  const result = await addMedia(newMedia);
  // error handling when database error occurs
  if (result.error) {
    return next(new Error(result.error));
  }
  res.status(201);
  res.json({ message: "New media item added.", ...result });
};

/**
 * @api {put} /media/:id Update Media Item
 * @apiName PutMedia
 * @apiGroup Media
 *
 * @apiParam {String} id Media item ID.
 * @apiParam {String} title New title for the media item.
 * @apiParam {String} description New description for the media item.
 *
 * @apiSuccess {Number} status HTTP status code (200 for success).
 */

const putMedia = (req, res) => {
  // placeholder
  res.sendStatus(200);
};

const deleteMedia = (req, res) => {
  // placeholder
  res.sendStatus(200);
};

export { getMedia, getMediaById, postMedia, putMedia, deleteMedia };
