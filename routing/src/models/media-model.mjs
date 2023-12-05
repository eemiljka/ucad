import { promisePool } from "../utils/database.mjs";

/**
 * @api {function} fetchAllMedia Fetch All Media Items
 * @apiName FetchAllMedia
 * @apiGroup Media
 *
 * @apiDescription Fetches all media items from the database.
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

const fetchAllMedia = async () => {
  try {
    const result = await promisePool.query("SELECT * FROM MediaItems");
    const [rows] = result; // first item in result array is the data rows
    //console.log(result);
    //console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

/**
 * @api {function} fetchMediaById Fetch Media Item by ID
 * @apiName FetchMediaById
 * @apiGroup Media
 *
 * @apiDescription Fetches a specific media item by its ID from the database.
 *
 * @apiParam {Number} id Media item ID.
 *
 * @apiSuccess {Object} mediaItem Media item details.
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

const fetchMediaById = async (id) => {
  try {
    // TODO: replace * with specific column names needed in this case
    const sql = `SELECT media_id, filename, filesize, media_type, title, description, MediaItems.created_at, Users.user_id, username
                 FROM MediaItems JOIN Users ON MediaItems.user_id = Users.user_id
                 WHERE media_id=?`;
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    console.log("rows", rows);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

/**
 * Add new media item to database
 *
 * @param {object} media - object containing all information about the new media item
 * @returns {object} - object containing id of the inserted media item in db
 */

/**
 * @api {function} addMedia Add New Media Item to Database
 * @apiName AddMedia
 * @apiGroup Media
 *
 * @apiDescription Adds a new media item to the database.
 *
 * @apiParam {Object} media Object containing all information about the new media item.
 * @apiParam {Number} media.user_id User ID associated with the media item.
 * @apiParam {String} media.filename Filename of the media item.
 * @apiParam {Number} media.size File size of the media item.
 * @apiParam {String} media.mimetype Media type of the media item.
 * @apiParam {String} media.title Title of the media item.
 * @apiParam {String} media.description Description of the media item.
 *
 * @apiSuccess {Object} result Object containing the ID of the inserted media item in the database.
 * @apiSuccess {Number} result.media_id ID of the inserted media item.
 *
 * @apiError (Error 5xx) {Object} error Error details.
 * @apiError (Error 5xx) {String} error.message Error message.
 */

const addMedia = async (media) => {
  const { user_id, filename, size, mimetype, title, description } = media;
  const sql = `INSERT INTO MediaItems (user_id, filename, filesize, media_type, title, description)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, filename, size, mimetype, title, description];
  try {
    const result = await promisePool.query(sql, params);
    console.log("result", result);
    return { media_id: result[0].insertId };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

export { fetchAllMedia, fetchMediaById, addMedia };
