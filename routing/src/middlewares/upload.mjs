/**
 * @api {middleware} upload Multer Upload Middleware
 * @apiName MulterUploadMiddleware
 * @apiGroup Middleware
 *
 * @apiDescription Middleware configuration for handling file uploads using Multer.
 *
 * @apiParam {Object} req Express request object.
 * @apiParam {Object} file Uploaded file object.
 * @apiParam {Function} cb Callback function to accept or reject the file.
 *
 * @apiSuccess {Object} file Uploaded file object.
 * @apiSuccess {String} file.fieldname Field name specified in the form.
 * @apiSuccess {String} file.originalname Original name of the uploaded file.
 * @apiSuccess {String} file.encoding File encoding.
 * @apiSuccess {String} file.mimetype File MIME type.
 * @apiSuccess {String} file.destination File destination (upload directory).
 * @apiSuccess {String} file.filename Name of the uploaded file.
 * @apiSuccess {String} file.path Full path to the uploaded file.
 * @apiSuccess {Number} file.size Size of the uploaded file in bytes.
 *
 * @apiError (Error 4xx) {Number} status HTTP status code (default is 500 if err.status is not defined).
 * @apiError (Error 4xx) {Object} error Error details.
 * @apiError (Error 4xx) {String} error.message Error message.
 * @apiError (Error 4xx) {Number} error.status HTTP status code.
 *
 * @apiErrorExample {json} Error 400:
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": {
 *       "message": "file missing or invalid",
 *       "status": 400
 *     }
 *   }
 */

import multer from "multer";
// multer configuration
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024, // max 10 MB
  },
  fileFilter: (req, file, cb) => {
    // allow only images and videos
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      // accept file
      cb(null, true);
    } else {
      // reject file
      const error = new Error("file missing or invalid");
      error.status = 400;
      cb(error, false);
    }
  },
});
export default upload;
